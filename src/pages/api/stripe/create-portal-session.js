import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { stripeCreatePortalSession } from "@/backend/controllers/stripe/paymentController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).post(stripeCreatePortalSession);

export default handler;
