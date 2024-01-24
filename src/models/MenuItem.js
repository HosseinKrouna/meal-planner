import mongoose, { model, models, Schema } from "mongoose";

const IngredientsSchema = new Schema({
	name: String,
	quantity: Number,
	unit: String,
});

const MenuItemSchema = new Schema(
	{
		image: { type: String },
		name: { type: String },
		description: { type: String },
		category: { type: mongoose.Types.ObjectId },
		numberOfPeople: { type: Number },
		ingredients: { type: [IngredientsSchema] },
	},
	{ timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
