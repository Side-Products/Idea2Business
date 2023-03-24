import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { allSearches, newProjectSearch } from "@/backend/controllers/projectSearchController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(allSearches);
handler.use(isAuthenticatedUser).post(newProjectSearch);

export default handler;
