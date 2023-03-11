import cloudinary from "cloudinary";
import crypto from "crypto";
import User from "../models/user";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import absoluteUrl from "next-absolute-url";
import sendEmail from "@/backend/utils/sendEmail";

// Setting up cloudinary config
// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// register user => /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.create({ name, email, password, image: "" });

	res.status(200).json({
		success: true,
		message: "Registered successfully",
	});
});

// avatar upload => /api/auth/upload-avatar
// const uploadAvatar = catchAsyncErrors(async (req, res) => {
// 	const { name, email, password } = req.body;

// 	const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
// 		folder: "project2product/avatars",
// 	});

// 	res.status(200).json({
// 		success: true,
// 		message: "Registered successfully",
// 	});
// });

// current user profile => /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.user._id);

	res.status(200).json({
		success: true,
		user,
	});
});

// update user profile => /api/me/update
const updateUserProfile = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.user._id);
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
			subject: "Project2Product Password Recovery",
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
	const users = await User.find();
	const admins = await User.find({ role: "admin" });

	res.status(200).json({
		success: true,
		users,
		admins,
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
		role: req.body.role,
	};
	const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

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
