<<<<<<< HEAD
import NextAuth, { getServerSession } from "next-auth";
import { UserInfo } from "@/models/UserInfo";
import { authOptions } from "@/libs/authOptions";

export async function isAdmin() {
	const session = await getServerSession(authOptions);
	const userEmail = session?.user?.email;
	if (!userEmail) {
		return false;
	}
	const userInfo = await UserInfo.findOne({ email: userEmail });
	if (!userInfo) {
		return false;
	}
	return userInfo.admin;
}
=======
import NextAuth from "next-auth";
import { authOptions } from "@/libs/authConfig";
// import { UserInfo } from "@/models/UserInfo";

// export async function isAdmin() {
// 	const session = await getServerSession(authOptions);
// 	const userEmail = session?.user?.email;
// 	if (!userEmail) {
// 		return false;
// 	}
// 	const userInfo = await UserInfo.findOne({ email: userEmail });
// 	if (!userInfo) {
// 		return false;
// 	}
// 	return userInfo.admin;
// }
>>>>>>> dfcf75c55a278ce8a9621aa64e3d66b6250ca642

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
