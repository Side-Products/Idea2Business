import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { allNewsletters } from "@/backend/controllers/newsletterController";
import { isAuthenticatedUser, authorizeRoles } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allNewsletters);

export default handler;
