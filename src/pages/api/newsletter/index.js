import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { newNewsletter } from "@/backend/controllers/newsletterController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.post(newNewsletter);

export default handler;
