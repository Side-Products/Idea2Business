import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	version: {
		type: Number,
		default: 1,
		required: true,
	},
	plan: {
		type: String,
		default: "",
		trim: true,
	},
	stripe_subscription: {
		type: String,
		required: [true, "Please enter a subscription id"],
		default: "",
		trim: true,
		unique: true,
		index: true,
	},
	stripe_subscription_status: {
		type: String,
		required: [true, "Please enter a subscription status"],
		default: "",
		trim: true,
	},
	stripe_priceId: {
		type: String,
		required: [true, "Please enter a price id"],
		default: "",
		trim: true,
	},
	stripe_customer: {
		type: String,
		required: [true, "Please enter a customer id"],
		default: "",
		trim: true,
		unique: true,
		index: true,
	},
	stripe_invoice: {
		type: String,
		required: [true, "Please enter an invoice id"],
		default: "",
		trim: true,
	},
	stripe_hosted_invoice_url: {
		type: String,
		default: "",
		trim: true,
	},
	amount_total: {
		type: Number,
		default: 0,
		required: true,
	},
	currency: {
		type: String,
		required: [true, "Please enter a currency"],
		default: "",
		trim: true,
	},
	paymentInfo: {
		id: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			default: "",
		},
	},
	subscriptionValidUntil: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
