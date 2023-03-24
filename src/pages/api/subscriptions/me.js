import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { mySubscription } from "@/backend/controllers/subscriptionController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).get(mySubscription);

export default handler;
