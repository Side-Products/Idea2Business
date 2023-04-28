import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { generateIdea } from "@/backend/controllers/ideaSwipeController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).get(generateIdea);

export default handler;
