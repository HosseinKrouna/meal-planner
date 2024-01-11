import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@/app/models/User";

export async function PUT(req) {
	mongoose.connect(process.env.MONGO_URL);
	const data = await req.json();
	const session = await getServerSession(authOptions);
	const email = session.user.email;

	const update = {};
	if ("name" in data) {
		update.name = data.name;
	}

	if ("image" in data) {
		update.image = data.image;
	}

	if ("name" in data) {
		await User.updateOne({ email }, update);
	}

	return Response.json(true);
}
