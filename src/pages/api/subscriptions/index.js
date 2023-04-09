import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { newSubscription } from "@/backend/controllers/subscriptionController";
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newSubscription);

export default handler;
