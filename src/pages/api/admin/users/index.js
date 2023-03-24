import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { getAdminAllUsers } from "@/backend/controllers/authController";
import { isAuthenticatedUser, authorizeRoles } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getAdminAllUsers);

export default handler;
