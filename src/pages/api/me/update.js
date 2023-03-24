import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { updateUserProfile } from "@/backend/controllers/authController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).put(updateUserProfile);

export default handler;
