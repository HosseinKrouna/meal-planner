import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: {
			type: String,
			required: true,
			validate: {
				validator: (pass) => pass && pass.length >= 5,
				message: "Das Passwort muss mindestens 5 Zeichen lang sein",
			},
			// validate: (pass) => {
			// 	if (!pass?.length || pass.length < 5) {
			// 		new Error("Das Passwort muss mindestens 5 Zeichen lang sein");
			// 		return false;
			// 	}
			// },
		},
	},
	{ timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
