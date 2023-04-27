import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { voteIdea } from "@/backend/controllers/generateIdeaController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).post(voteIdea);

export default handler;
