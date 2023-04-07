import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { getSearchedIdea, updateSearchedIdea, deleteSearchedIdea } from "@/backend/controllers/ideaSearchController";
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(getSearchedIdea);
handler.put(updateSearchedIdea);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteSearchedIdea);

export default handler;
