import { User } from "@/models/User";
import bcrypt from "bcrypt";

export async function authenticate(credentials) {
	const email = credentials?.email;
	const password = credentials?.password;

	const user = await User.findOne({ email });
	const passwordOk = user && bcrypt.compareSync(password, user.password);

	if (passwordOk) {
		return user;
	}

	return null;
}
