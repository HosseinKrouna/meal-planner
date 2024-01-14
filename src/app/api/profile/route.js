import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@/models/User";

export async function PUT(req) {
	mongoose.connect(process.env.MONGO_URL);
	const data = await req.json();
	const session = await getServerSession(authOptions);
	const email = session.user.email;

	await User.updateOne({ email }, data);
	console.log(data);

	// const update = {};
	// if ("name" in data) {
	// 	update.name = data.name;
	// }

	// if ("image" in data) {
	// 	update.image = data.image;
	// }

	// if ("name" in data) {
	// 	await User.updateOne({ email }, update);
	// }

	return Response.json(true);
}

export async function GET() {
	mongoose.connect(process.env.MONGO_URL);
	const session = await getServerSession(authOptions);
	const email = session.user.email;
	return Response.json(await User.findOne({ email }));
}
