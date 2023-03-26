import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { newBugReport } from "@/backend/controllers/bugReportController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.post(newBugReport);

export default handler;
