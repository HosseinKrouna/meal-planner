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

const StepsSchema = new Schema({
	stepName: String,
	preparationDescription: String,
});

const PreparationTimeSchema = new Schema({
	makeReadyTime: Number,
	cookingBakingTime: Number,
	brewingRestingTime: Number,
});

const NutritionalValuesSchema = new Schema({
	calories: Number,
	carbohydrates: Number,
	protein: Number,
	fat: Number,
	fiber: Number,
});

const MenuItemSchema = new Schema(
	{
		image: { type: String },
		recipeName: { type: String },
		description: { type: String },
		category: { type: mongoose.Types.ObjectId },
		numberOfPeople: { type: Number },
		ingredientsList: [IngredientsGroupSchema],
		preparation: PreparationTimeSchema,
		steps: [StepsSchema],
		nutritionalValuesPerServing: NutritionalValuesSchema,
	},
	{ timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
