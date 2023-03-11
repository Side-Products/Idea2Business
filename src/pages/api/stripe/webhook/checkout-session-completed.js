import nc from "next-connect";
import dbConnect from "@/config/dbConnect";
import { stripeWebhookCheckoutSessionCompleted } from "@/backend/controllers/paymentController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

export const config = {
	api: {
		bodyParser: false,
	},
};

handler.post(stripeWebhookCheckoutSessionCompleted);

export default handler;
