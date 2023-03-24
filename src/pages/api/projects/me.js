import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { mySearches } from "@/backend/controllers/projectSearchController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).get(mySearches);

export default handler;
