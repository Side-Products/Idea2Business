import mongoose from "mongoose";

const ideaSwipeVotesSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	ideaSwipe: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "IdeaSwipe",
		required: true,
	},
	vote: {
		type: Number,
		required: true,
		enum: [1, -1],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.IdeaSwipeVotes || mongoose.model("IdeaSwipeVotes", ideaSwipeVotesSchema);
