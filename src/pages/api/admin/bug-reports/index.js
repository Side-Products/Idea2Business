import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { allBugReports } from "@/backend/controllers/bugReportController";
import { isAuthenticatedUser, authorizeRoles } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allBugReports);

export default handler;
