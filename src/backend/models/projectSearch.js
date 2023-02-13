import mongoose from "mongoose";

const projectSearchSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name"],
		trim: true,
		maxlength: [100, "Name cannot exceed 100 characters"],
	},
	description: {
		type: String,
		required: [true, "Please enter a description"],
		trim: true,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "users",
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.ProjectSearch || mongoose.model("ProjectSearch", projectSearchSchema);
