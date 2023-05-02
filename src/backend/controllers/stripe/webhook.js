import mongoose from "mongoose";
import Subscription from "../../models/subscription";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import getRawBody from "raw-body";
import User from "../../models/user";
import { getPlanFromStripePriceId, getLatestSubscriptionPlansVersion, getCreditsFromStripePriceId, getCreditsFromPlanName } from "@/utils/Helpers";
import { proPlan, premiumPlan } from "@/config/constants";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const stripeWebhook = catchAsyncErrors(async (req, res) => {
	// Get raw body
	const rawBody = await getRawBody(req);

	let eventData;
	let eventType;
	// Check if webhook signing is configured.
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (webhookSecret) {
		// Retrieve the event by verifying the signature using the raw body and secret.
		let event;
		let signature = req.headers["stripe-signature"];

		try {
			event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
		} catch (err) {
			console.log(`⚠️ Webhook signature verification failed.`);
			return res.sendStatus(400);
		}

		// Extract the object from the event.
		eventData = event.data;
		eventType = event.type;
	} else {
		// Webhook signing is recommended, but if the secret is not configured in `config.js`,
		// retrieve the event data directly from the request body.
		eventData = rawBody.data;
		eventType = rawBody.type;
	}

	switch (eventType) {
		case "checkout.session.completed":
			// Payment is successful and the subscription is created.
			// You should provision the subscription and save the customer ID to your database.
			await stripeWebhookCheckoutSessionCompleted(req, res, eventData);
			break;
		case "invoice.paid":
			// Continue to provision the subscription as payments continue to be made.
			// Store the status in your database and check when a user accesses your service.
			// This approach helps you avoid hitting rate limits.
			await stripeInvoicePaid(req, res, eventData);
			break;
		case "invoice.payment_failed":
			// The payment failed or the customer does not have a valid payment method.
			// The subscription becomes past_due. Notify your customer and send them to the
			// customer portal to update their payment information.
			// TODO: Send email to user
			break;
		case "customer.subscription.updated":
			// Handle subscription updated from portal
			await stripeCustomerSubscriptionUpdated(req, res, eventData);
			break;
		default:
			console.log("stripe event:", eventType);
		// Unhandled event type
	}
});

// Store subscription after payment => /api/stripe/webhook
const stripeWebhookCheckoutSessionCompleted = catchAsyncErrors(async (req, res, eventData) => {
	try {
		const session = eventData.object;
		const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription);
		const invoice = await stripe.invoices.retrieve(session.invoice);

		const user = await User.findById(session.client_reference_id);
		if (user) {
			user.stripe_customer_id = session.customer;
			user.credits = user.credits + getCreditsFromStripePriceId(stripeSubscription.plan.id);
			await user.save();
		}

		const subscription = await Subscription.create({
			user: mongoose.Types.ObjectId(session.client_reference_id),
			version: getLatestSubscriptionPlansVersion(),
			plan: getPlanFromStripePriceId(stripeSubscription.plan.id),
			stripe_subscription: session.subscription,
			stripe_subscription_status: stripeSubscription.status,
			stripe_priceId: stripeSubscription.plan.id,
			stripe_customer: session.customer,
			stripe_invoice: session.invoice,
			stripe_hosted_invoice_url: invoice.hosted_invoice_url || "",
			amount_total: session.amount_total, // divide by 100 when retrieving from db
			currency: session.currency,
			paymentInfo: {
				id: session.payment_intent,
				status: session.payment_status,
			},
			subscriptionValidUntil: parseInt(stripeSubscription.current_period_end) * 1000, // seconds to milliseconds
		});
		await subscription.save();

		res.status(200).json({
			success: true,
			subscription,
		});
	} catch (error) {
		console.log("Error in stripe checkout payment:", error);
	}
});

const stripeCustomerSubscriptionUpdated = catchAsyncErrors(async (req, res, eventData) => {
	try {
		const session = eventData.object;
		if (session.subscription === null) return res.status(404).json({ success: false });

		const old_subscription = await Subscription.findOne({ stripe_subscription: session.id }).sort({ createdAt: "desc" });
		if (!old_subscription) return res.status(200).json({ success: true, message: "No matching subscription found" });

		const lastUpdated = new Date(old_subscription.updatedAt).getTime();
		const currentTime = new Date().getTime();
		const differenceInSeconds = Math.round((currentTime - lastUpdated) / 1000);

		if (differenceInSeconds > 20) {
			const oldPlan = old_subscription.plan;
			const newPlan = getPlanFromStripePriceId(session.plan.id);

			const user = await User.findById(old_subscription.user);
			if (user) {
				user.credits =
					user.credits + (oldPlan == proPlan && newPlan == premiumPlan ? getCreditsFromPlanName(premiumPlan) - getCreditsFromPlanName(proPlan) : 0);
				await user.save();
			}
		}

		old_subscription.stripe_subscription_status = session.status;
		old_subscription.stripe_priceId = session.plan.id;
		old_subscription.plan = getPlanFromStripePriceId(session.plan.id);
		old_subscription.stripe_invoice = session.latest_invoice;
		old_subscription.stripe_hosted_invoice_url = session.hosted_invoice_url || old_subscription.stripe_hosted_invoice_url || "";
		old_subscription.amount_total = session.total || old_subscription.amount_total; // divide by 100 when retrieving from db
		old_subscription.currency = session.currency;
		old_subscription.paymentInfo = {
			id: session.payment_intent,
			status: session.status,
		};
		old_subscription.subscriptionValidUntil = parseInt(session.current_period_end) * 1000; // seconds to milliseconds
		old_subscription.updatedAt = Date.now();
		await old_subscription.save();

		res.status(200).json({
			success: true,
			subscription: old_subscription,
		});
	} catch (error) {
		console.log("Error in stripe checkout payment:", error);
	}
});

const stripeInvoicePaid = catchAsyncErrors(async (req, res, eventData) => {
	try {
		const session = eventData.object;
		if (session.subscription === null) return res.status(404).json({ success: false });

		const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription);

		const old_subscription = await Subscription.findOne({ stripe_subscription: session.subscription }).sort({ createdAt: "desc" });
		if (!old_subscription) return res.status(200).json({ success: true, message: "No matching subscription found" });

		const lastUpdated = new Date(old_subscription.updatedAt).getTime();
		const currentTime = new Date().getTime();
		const differenceInSeconds = Math.round((currentTime - lastUpdated) / 1000);

		if (differenceInSeconds > 20) {
			const user = await User.findById(old_subscription.user);
			if (user) {
				user.credits = user.credits + getCreditsFromStripePriceId(stripeSubscription.plan.id);
				await user.save();
			}
		}

		old_subscription.stripe_subscription_status = stripeSubscription.status;
		old_subscription.stripe_priceId = stripeSubscription.plan.id;
		old_subscription.plan = getPlanFromStripePriceId(stripeSubscription.plan.id);
		old_subscription.stripe_invoice = session.id;
		old_subscription.stripe_hosted_invoice_url = session.hosted_invoice_url || old_subscription.stripe_hosted_invoice_url || "";
		old_subscription.amount_total = session.total; // divide by 100 when retrieving from db
		old_subscription.currency = session.currency;
		old_subscription.paymentInfo = {
			id: session.payment_intent,
			status: session.status,
		};
		old_subscription.subscriptionValidUntil = parseInt(stripeSubscription.current_period_end) * 1000; // seconds to milliseconds
		old_subscription.updatedAt = Date.now();
		await old_subscription.save();

		res.status(200).json({
			success: true,
			subscription: old_subscription,
		});
	} catch (error) {
		console.log("Error in stripe checkout payment:", error);
	}
});

export { stripeWebhook };
