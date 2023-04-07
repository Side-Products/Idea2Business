import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { generateNewResponse } from "@/backend/controllers/generateController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).post(generateNewResponse);

export default handler;
