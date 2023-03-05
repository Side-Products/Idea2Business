import cloudinary from "cloudinary";
import User from "../models/user";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

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

export { registerUser, currentUserProfile, updateUserProfile };
