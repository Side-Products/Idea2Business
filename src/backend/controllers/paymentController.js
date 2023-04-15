import absoluteUrl from "next-absolute-url";
import User from "../models/user";
import Subscription from "../models/subscription";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import getRawBody from "raw-body";
import { product_name, domain } from "@/config/constants";
import { standardPlan, proPlusPlan } from "@/config/constants";
import { getSubscriptionPlanName, getSubscriptionPlanPrice, getSubscriptionPlanValidDays, getLatestSubscriptionPlansVersion } from "@/utils/Helpers";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// Generate stripe checkout session => /api/stripe/checkout-session
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
	// Get origin
	const { origin } = absoluteUrl(req);

	// Create stripe checkout session
	const session = await stripe.checkout.sessions.create({
		success_url: `${origin}/profile?paymentsuccess=true`,
		cancel_url: `${origin}/pricing`,
		customer_email: req.user.email,
		client_reference_id: req.user._id || req.user.id,
		metadata: {
			plan:
				parseInt(req.query.amount) == getSubscriptionPlanPrice(standardPlan)
					? getSubscriptionPlanName(standardPlan) + " Subscription"
					: parseInt(req.query.amount) == getSubscriptionPlanPrice(proPlusPlan)
					? getSubscriptionPlanName(proPlusPlan) + " Subscription"
					: "",
		},
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name:
							parseInt(req.query.amount) == getSubscriptionPlanPrice(standardPlan)
								? getSubscriptionPlanName(standardPlan) + " Subscription"
								: parseInt(req.query.amount) == getSubscriptionPlanPrice(proPlusPlan)
								? getSubscriptionPlanName(proPlusPlan) + " Subscription"
								: "",
						description: "Subscription to " + product_name,
						images: [`https://${domain}/logo.png`],
					},
					unit_amount: parseInt(req.query.amount) * 100,
				},
				quantity: 1,
			},
		],
		mode: "payment",
		billing_address_collection: "auto",
	});

	res.status(200).json(session);
});

// Update user with subscription after payment => /api/stripe/webhook/checkout-session-completed
// https://idea2business.xyz/api/stripe/webhook/checkout-session-completed
const stripeWebhookCheckoutSessionCompleted = catchAsyncErrors(async (req, res) => {
	// Get raw body
	const rawBody = await getRawBody(req);

	try {
		const signature = req.headers["stripe-signature"];
		const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			const user = await User.findById(session.client_reference_id);

			const subscription = await Subscription.create({
				user: user._id,
				version: getLatestSubscriptionPlansVersion(),
				amountPaid: session.amount_total / 100,
				paymentInfo: {
					id: session.payment_intent,
					status: session.payment_status,
				},
				paidOn: Date.now(),
				subscriptionValidUntil:
					Date.now() +
					(session.amount_total / 100 == getSubscriptionPlanPrice(proPlusPlan)
						? getSubscriptionPlanValidDays(proPlusPlan)
						: getSubscriptionPlanValidDays(standardPlan)) *
						24 *
						60 *
						60 *
						1000,
			});
			await subscription.save();

			res.status(200).json({
				success: true,
				subscription,
			});
		}
	} catch (error) {
		console.log("Error in Stripe checkout payment:", error);
	}
});

export { stripeCheckoutSession, stripeWebhookCheckoutSessionCompleted };
