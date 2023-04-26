import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { getIdea } from "@/backend/controllers/generateIdeaController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.post(getIdea);

export default handler;
