import mongoose, { model, models, Schema } from "mongoose";

const IngredientSchema = new Schema({
	ingredientName: String,
	quantity: Number,
	unit: String,
});

const IngredientsListSchema = new Schema({
	ingredientsGroup: String,
	ingredients: [IngredientSchema],
});

const MenuItemSchema = new Schema(
	{
		image: { type: String },
		name: { type: String },
		description: { type: String },
		category: { type: mongoose.Types.ObjectId },
		numberOfPeople: { type: Number },
		ingredientsList: [IngredientsListSchema],
	},
	{ timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
