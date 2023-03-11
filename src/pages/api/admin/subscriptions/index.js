import nc from "next-connect";
import dbConnect from "@/config/dbConnect";
import { allAdminSubscriptions } from "@/backend/controllers/subscriptionController";
import { isAuthenticatedUser, authorizeRoles } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminSubscriptions);

export default handler;
