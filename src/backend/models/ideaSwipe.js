import mongoose from "mongoose";

const ideaSwipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name"],
		trim: true,
		maxLength: [100, "Name cannot exceed 100 characters"],
	},
	description: {
		type: String,
		required: [true, "Please enter a description"],
		trim: true,
	},
	votes: {
		type: Number,
		// Default votes
		default: 0,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.IdeaSwipe || mongoose.model("IdeaSwipe", ideaSwipeSchema);
