import mongoose from "mongoose";

const FeatureRequestSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		maxLength: [100, "Name cannot exceed 100 characters"],
	},
	email: {
		type: String,
		trim: true,
	},
	featureName: {
		type: String,
		required: [true, "Please enter a feature name"],
		trim: true,
		maxLength: [200, "Feature name cannot exceed 200 characters"],
	},
	featureDescription: {
		type: String,
		required: [true, "Please enter a description"],
		trim: true,
		maxLength: [4000, "Feature description cannot exceed 4000 characters"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.FeatureRequest || mongoose.model("FeatureRequest", FeatureRequestSchema);
