import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

async function authenticate(credentials) {
	const email = credentials?.email;
	const password = credentials?.password;

	const user = await User.findOne({ email });
	const passwordOk = user && bcrypt.compareSync(password, user.password);

	console.log({ passwordOk });

	if (passwordOk) {
		return user;
	}

	return null;
}

export const authOptions = {
	secret: process.env.SECRET,
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			id: "credentials",
			credentials: {
				username: {
					label: "Email",
					type: "email",
					placeholder: "test@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			authorize: authenticate,
		}),
	],
};

export default NextAuth(authOptions);
