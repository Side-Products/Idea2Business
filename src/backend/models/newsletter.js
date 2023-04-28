import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
	},
	frequency: {
		type: String,
		trim: true,
		maxLength: [100, "Frequency cannot exceed 100 characters"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);
