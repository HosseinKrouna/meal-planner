import mongoose, { model, models, Schema } from "mongoose";

const MenuItemSchema = new Schema(
	{
		image: { type: String },
		name: { type: String },
		description: { type: String },
		ingredients: { type: Number },
	},
	{ timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
