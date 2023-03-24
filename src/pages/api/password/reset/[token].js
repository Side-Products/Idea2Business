import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { resetPassword } from "@/backend/controllers/authController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.put(resetPassword);

export default handler;
