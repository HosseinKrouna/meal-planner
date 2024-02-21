// import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";

export async function GET(req) {
	mongoose.connect(process.env.MONGO_URL);

	try {
		const users = await User.find().lean();
		return Response.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		return Response.json([]);
	}
}

// export async function GET(req) {
// 	mongoose.set("debug", true);
// 	mongoose.connect(process.env.MONGO_URL);

// 	const users = await User.find();
// 	return Response.json(users);
// }

// export async function GET(req) {
// 	mongoose.connect(process.env.MONGO_URL);

// 	// if (await isAdmin(req)) {
// 	const users = await User.find();
// 	return Response.json(users);
// 	// } else {
// 	// 	return Response.json([]);
// 	// }
// }
