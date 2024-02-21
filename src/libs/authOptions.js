// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/libs/mongoConnect";
// import { authenticate } from "@/libs/authenticate";

// export const authOptions = {
// 	secret: process.env.SECRET,
// 	adapter: MongoDBAdapter(clientPromise),
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 		}),
// 		CredentialsProvider({
// 			name: "Credentials",
// 			id: "credentials",
// 			credentials: {
// 				username: {
// 					label: "Email",
// 					type: "email",
// 					placeholder: "test@example.com",
// 				},
// 				password: { label: "Password", type: "password" },
// 			},
// 			authorize: authenticate,
// 		}),
// 	],
// };
