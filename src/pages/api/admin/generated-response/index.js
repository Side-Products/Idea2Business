import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { allGeneratedResponses } from "@/backend/controllers/generateController";
import { isAuthenticatedUser, authorizeRoles } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allGeneratedResponses);

export default handler;
