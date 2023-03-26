import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { newContactUsMessage } from "@/backend/controllers/contactUsController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.post(newContactUsMessage);

export default handler;
