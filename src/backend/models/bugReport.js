import mongoose from "mongoose";

const bugReportSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		maxLength: [100, "Name cannot exceed 100 characters"],
	},
	email: {
		type: String,
		trim: true,
	},
	bugDescription: {
		type: String,
		required: [true, "Please enter a description"],
		trim: true,
		maxLength: [2000, "Bug description cannot exceed 2000 characters"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.BugReport || mongoose.model("BugReport", bugReportSchema);
