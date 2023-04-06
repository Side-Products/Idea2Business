import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { allSearches, newIdeaSearch } from "@/backend/controllers/ideaSearchController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(allSearches);
handler.use(isAuthenticatedUser).post(newIdeaSearch);

export default handler;
