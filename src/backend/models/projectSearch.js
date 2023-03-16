import mongoose from "mongoose";

const projectSearchSchema = new mongoose.Schema({
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

export default mongoose.models.ProjectSearch || mongoose.model("ProjectSearch", projectSearchSchema);
