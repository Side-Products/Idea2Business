import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { allIdeaSwipes } from "@/backend/controllers/generateIdeaController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(allIdeaSwipes);

export default handler;
