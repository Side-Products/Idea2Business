import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { stripeWebhook } from "@/backend/controllers/stripe/webhook";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

export const config = {
	api: {
		bodyParser: false,
	},
};

handler.post(stripeWebhook);

export default handler;
