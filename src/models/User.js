import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true, index: true },
		name: { type: String },
		password: { type: String },
		image: { type: String },
	},
	{ timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
