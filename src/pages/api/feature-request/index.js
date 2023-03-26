import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { newFeatureRequest } from "@/backend/controllers/featureRequestController";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.post(newFeatureRequest);

export default handler;
