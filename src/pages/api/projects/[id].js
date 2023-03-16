import nc from "next-connect";
import dbConnect from "@/config/dbConnect";
import { getSearchedProject, updateSearchedProject, deleteSearchedProject } from "@/backend/controllers/projectSearchController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(getSearchedProject);
handler.put(updateSearchedProject);
handler.delete(deleteSearchedProject);

export default handler;
