import absoluteUrl from "next-absolute-url";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import { getPlanFromStripePriceId } from "@/utils/Helpers";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// Generate stripe checkout session => /api/stripe/checkout-session
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
	// Get origin
	const { origin } = absoluteUrl(req);

	// Create stripe checkout session
	const session = await stripe.checkout.sessions.create({
		mode: "subscription",
		success_url: `${origin}/profile?paymentsuccess=true`,
		cancel_url: `${origin}/pricing`,
		customer_email: req.user.email,
		client_reference_id: req.user._id || req.user.id,
		metadata: {
			plan: getPlanFromStripePriceId(req.query.stripePriceId),
		},
		line_items: [
			{
				price: req.query.stripePriceId,
				quantity: 1,
			},
		],
		billing_address_collection: "auto",
		allow_promotion_codes: true,
	});

	res.status(200).json(session);
});

const stripeCreatePortalSession = catchAsyncErrors(async (req, res) => {
	// Get origin
	const { origin } = absoluteUrl(req);

	// This is the url to which the customer will be redirected when they are done
	// managing their billing with the portal.
	const returnUrl = `${origin}/profile`;

	const portalSession = await stripe.billingPortal.sessions.create({
		customer: req.user.stripe_customer_id,
		// return_url: returnUrl,
	});

	res.status(200).json({ portalSessionUrl: portalSession.url });
});

export { stripeCheckoutSession, stripeCreatePortalSession };
