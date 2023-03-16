import nc from "next-connect";
import dbConnect from "@/config/dbConnect";
import { stripeCheckoutSession } from "@/backend/controllers/paymentController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).get(stripeCheckoutSession);

export default handler;
