import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { deleteNewsletter } from "@/backend/controllers/newsletterController";
import { isAuthenticatedUser, authorizeRoles } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteNewsletter);

export default handler;
