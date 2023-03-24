import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { registerUser } from "@/backend/controllers/authController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.post(registerUser);

export default handler;
