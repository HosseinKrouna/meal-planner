import mongoose, { model, models, Schema } from "mongoose";

const IngredientSchema = new Schema({
	ingredientName: String,
	quantity: Number,
	unit: String,
});

const IngredientsGroupSchema = new Schema({
	ingredientsGroup: String,
	ingredients: [IngredientSchema],
});

const MenuItemSchema = new Schema(
	{
		image: { type: String },
		recipeName: { type: String },
		description: { type: String },
		category: { type: mongoose.Types.ObjectId },
		numberOfPeople: { type: Number },
		ingredientsList: [IngredientsGroupSchema],
	},
	{ timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
