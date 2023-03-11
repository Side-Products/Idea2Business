import absoluteUrl from "next-absolute-url";
import User from "../models/user";
import Subscription from "../models/subscription";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import getRawBody from "raw-body";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// Generate stripe checkout session => /api/stripe/checkout-session
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
	// Get origin
	const { origin } = absoluteUrl(req);

	// Create stripe checkout session
	const session = await stripe.checkout.sessions.create({
		success_url: `${origin}/profile`,
		cancel_url: `${origin}/pricing`,
		customer_email: req.user.email,
		client_reference_id: req.user._id,
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: parseInt(req.query.amount) == 5 ? "Standard Subscription" : parseInt(req.query.amount) == 10 ? "Pro Plus Subscription" : "",
						description: "Subscription to Project2Product",
						// TODO: change this to a custom image
						images: ["https://public.easyinvoice.cloud/img/logo_en_original.png"],
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
				amountPaid: session.amount_total / 100,
				paymentInfo: {
					id: session.payment_intent,
					status: session.payment_status,
				},
				paidOn: Date.now(),
				subscriptionValidUntil: Date.now() + (session.amount_total / 100 == 10 ? 30 : 7) * 24 * 60 * 60 * 1000,
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
