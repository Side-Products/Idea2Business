import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { allIdeaSwipes } from "@/backend/controllers/ideaSwipeController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.post(allIdeaSwipes);
handler.use(isAuthenticatedUser).get(allIdeaSwipes);

export default handler;
