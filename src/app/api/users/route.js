import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";

export async function GET(req) {
	mongoose.connect(process.env.MONGO_URL);

	if (await isAdmin(req)) {
		const users = await User.find();
		return Response.json(users);
	} else {
		return Response.json([]);
	}
}
