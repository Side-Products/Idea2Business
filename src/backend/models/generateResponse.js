import mongoose from "mongoose";

const generateResponseSchema = new mongoose.Schema({
	category: {
		type: String,
		required: [true, "Please enter the category"],
		trim: true,
	},
	identifier: {
		type: String,
		required: [true, "Please enter the identifier"],
		trim: true,
	},
	ideaSearch: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "IdeaSearch",
		required: true,
	},
	response: {
		type: String,
		required: [true, "Please enter a response"],
		trim: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.GenerateResponse || mongoose.model("GenerateResponse", generateResponseSchema);
