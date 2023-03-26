import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { deleteContactUsMessage } from "@/backend/controllers/contactUsController";
import { isAuthenticatedUser, authorizeRoles } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteContactUsMessage);

export default handler;
