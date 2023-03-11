import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	amountPaid: {
		type: Number,
		default: 0,
		required: true,
	},
	paymentInfo: {
		id: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	paidOn: {
		type: Date,
		required: true,
	},
	subscriptionValidUntil: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
