import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { deleteGeneratedResponse } from "@/backend/controllers/generateController";
import { isAuthenticatedUser, authorizeRoles } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteGeneratedResponse);

export default handler;
