import nc from "next-connect";
import dbConnect from "@/config/dbConnect";
import { allSearches, newProjectSearch } from "@/backend/controllers/projectSearchController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();
handler.get(allSearches);
handler.post(newProjectSearch);

export default handler;
