import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
	{
		name: { type: String },
		email: { type: String, required: true, unique: true },
		password: {
			type: String,
			required: true,
			validate: (pass) => {
				if (!pass?.length || pass.length < 5) {
					new Error("Das Passwort muss mindestens 5 Zeichen lang sein");
				}
			},
		},
		phonenummber: { type: String },
		streetAddress: { type: String },
		postalCode: { type: String },
		city: { type: String },
		country: { type: String },
		image: { type: String },
	},
	{ timestamps: true }
);

UserSchema.post("validate", function (user) {
	const notHashedPassword = user.password;
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(notHashedPassword, salt);
});

export const User = models?.User || model("User", UserSchema);
