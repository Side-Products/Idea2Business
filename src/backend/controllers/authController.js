import crypto from "crypto";
import User from "../models/user";
import Subscription from "../models/subscription";
import IdeaSearch from "../models/ideaSearch";
import GenerateResponse from "../models/generateResponse";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import absoluteUrl from "next-absolute-url";
import sendEmail from "@/backend/utils/sendEmail";
import { product_name, standardPlan, proPlusPlan } from "@/config/constants";
import { getSubscriptionPlanName, getSubscriptionPlanValidDays, getSubscriptionPlanCredits, getLatestSubscriptionPlansVersion } from "@/utils/Helpers";

// register user => /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.create({ name, email, password, image: "" });

	res.status(200).json({
		success: true,
		message: "Registered successfully",
	});
});

// current user profile => /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.user._id || req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

// update user profile => /api/me/update
const updateUserProfile = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.user._id || req.user.id);
	if (user) {
		user.name = req.body.name;
		user.email = req.body.email;
		if (req.body.password) user.password = req.body.password;
	}

	await user.save();

	res.status(200).json({
		success: true,
		user,
	});
});

// forgot password => /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler("User not found with this email", 404));
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });

	// Get origin
	const { origin } = absoluteUrl(req);

	// Create reset password url
	const resetUrl = `${origin}/password/reset/${resetToken}`;
	const message = `Your password reset url is:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: product_name + " Password Recovery",
			message,
		});
		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(error.message, 500));
	}
});

// reset password => /api/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {
	// Hash url token
	const resetPasswordToken = crypto.createHash("sha256").update(req.query.token).digest("hex");

	const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

	if (!user) {
		return next(new ErrorHandler("Password reset token has been expired", 400));
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler("Password does not match", 400));
	}

	// Setup new password
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	res.status(200).json({
		success: true,
		message: "Password updated successfully",
	});
});

// get all users => /api/admin/users
const getAdminAllUsers = catchAsyncErrors(async (req, res) => {
	const users = await User.find().sort({ createdAt: "desc" });
	const usersCount = await User.countDocuments();
	const admins = await User.find({ role: "admin" }).sort({ createdAt: "desc" });
	const allAccessUsers = await User.find({ role: "allAccess" }).sort({ createdAt: "desc" });

	res.status(200).json({
		success: true,
		users,
		usersCount,
		admins,
		allAccessUsers,
	});
});

// get user details => /api/admin/users/:id
const getAdminUserDetails = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.query.id);

	if (!user) {
		return next(new ErrorHandler("User not found with this ID", 400));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// update user details => /api/admin/users/:id
const updateAdminUserDetails = catchAsyncErrors(async (req, res) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		credits: req.body.credits,
		role: req.body.role,
	};
	const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	if (req.body.subscription) {
		const subscription = await Subscription.create({
			user: req.query.id,
			version: getLatestSubscriptionPlansVersion(),
			plan: req.body.subscription,
			country: "giveaway",
			amountPaid: 0,
			paymentInfo: { id: "giveaway", status: "giveaway" },
			paidOn: Date.now(),
			subscriptionValidUntil:
				Date.now() +
				(req.body.subscription == getSubscriptionPlanName(proPlusPlan)
					? // ? getSubscriptionPlanValidDays(proPlusPlan)
					  // : getSubscriptionPlanValidDays(standardPlan)) *
					  7
					: 7) *
					24 *
					60 *
					60 *
					1000,
		});
		// Update user credits
		const user = await User.findOne({ _id: req.query.id });
		user.credits =
			user.credits +
			(req.body.subscription == getSubscriptionPlanName(proPlusPlan)
				? getSubscriptionPlanCredits(proPlusPlan)
				: req.body.subscription == getSubscriptionPlanName(standardPlan)
				? getSubscriptionPlanCredits(standardPlan)
				: 0);
		await user.save();
	}

	if (!user) {
		return next(new ErrorHandler("User not found with this ID", 400));
	}

	res.status(200).json({
		success: true,
	});
});

// delete user => /api/admin/users/:id
const deleteAdminUser = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.query.id);

	if (!user) {
		return next(new ErrorHandler("User not found with this ID", 400));
	}

	// Delete all searched ideas related to the user
	await IdeaSearch.deleteMany({ user: user._id });

	// Delete all generated responses related to the user
	await GenerateResponse.deleteMany({ user: user._id });

	await user.remove();

	res.status(200).json({
		success: true,
		user,
	});
});

export {
	registerUser,
	currentUserProfile,
	updateUserProfile,
	forgotPassword,
	resetPassword,
	getAdminAllUsers,
	getAdminUserDetails,
	updateAdminUserDetails,
	deleteAdminUser,
};
