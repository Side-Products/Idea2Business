import Subscription from "../models/subscription";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

// create new subscription => /api/subscriptions
const newSubscription = catchAsyncErrors(async (req, res) => {
	const { amountPaid, paymentInfo, paidOn, subscriptionValidUntil } = req.body;
	const subscription = await Subscription.create({ user: req.user._id, amountPaid, paymentInfo, paidOn, subscriptionValidUntil });

	res.status(200).json({
		success: true,
		subscription,
	});
});

// get subscription status of current user => /api/subscriptions/me
const mySubscription = catchAsyncErrors(async (req, res) => {
	const subscription = await Subscription.find({ user: req.user._id });

	res.status(200).json({
		success: true,
		subscription,
	});
});

export { newSubscription, mySubscription };
