import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		maxLength: [100, "Name cannot exceed 100 characters"],
	},
	email: {
		type: String,
		trim: true,
	},
	subject: {
		type: String,
		required: [true, "Please enter a subject"],
		trim: true,
		maxLength: [100, "Subject cannot exceed 100 characters"],
	},
	message: {
		type: String,
		required: [true, "Please enter a message"],
		trim: true,
		maxLength: [1000, "Message cannot exceed 1000 characters"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.ContactUs || mongoose.model("ContactUs", contactUsSchema);
