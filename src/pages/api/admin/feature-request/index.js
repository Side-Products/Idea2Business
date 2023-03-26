import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { allFeatureRequests } from "@/backend/controllers/featureRequestController";
import { isAuthenticatedUser, authorizeRoles } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allFeatureRequests);

export default handler;
