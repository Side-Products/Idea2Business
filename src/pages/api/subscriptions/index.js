import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { newSubscription } from "@/backend/controllers/subscriptionController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).post(newSubscription);

export default handler;
