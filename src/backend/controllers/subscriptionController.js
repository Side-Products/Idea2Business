import Subscription from "../models/subscription";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { getLatestSubscriptionPlansVersion } from "@/utils/Helpers";

// create new subscription => /api/subscriptions
const newSubscription = catchAsyncErrors(async (req, res) => {
	// TODO
	res.status(200).json({
		success: false,
	});
});

// get subscription status of current user => /api/subscriptions/me
const mySubscription = catchAsyncErrors(async (req, res) => {
	const subscription = await Subscription.find({ user: req.user._id || req.user.id })
		.sort({ updatedAt: "desc" })
		.populate({
			path: "user",
			select: "name email",
		});

	res.status(200).json({
		success: true,
		subscription,
	});
});

// get all subscriptions - ADMIN => /api/admin/subscriptions
const allAdminSubscriptions = catchAsyncErrors(async (req, res) => {
	const subscriptions = await Subscription.find()
		.populate({
			path: "user",
			select: "name email",
		})
		.sort({ updatedAt: "desc" });

	res.status(200).json({
		success: true,
		subscriptions,
	});
});

// delete subscription - ADMIN => /api/admin/subscriptions/id
const deleteAdminSubscription = catchAsyncErrors(async (req, res, next) => {
	const subscription = await Subscription.findById(req.query.id);

	if (!subscription) {
		return next(ErrorHandler("Subscription not found with this ID", 404));
	}

	await subscription.remove();

	res.status(200).json({
		success: true,
	});
});

export { newSubscription, mySubscription, allAdminSubscriptions, deleteAdminSubscription };
