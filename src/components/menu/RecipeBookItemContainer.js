import RecipeBookItem from "@/components/menu/RecipeBookItem";

export default function RecipeBookItemContainer({
	categoryItem,
	recipeBookItems,
	removeRecipeBookItem,
}) {
	const filteredRecipes = recipeBookItems.filter(
		(item) => item.name.category === categoryItem._id
	);

	console.log("RecipeBookItem rendered. Filtered recipes:", filteredRecipes);

	return (
		<section className="mt-8">
			{filteredRecipes.map((item) => (
				<RecipeBookItem
					key={item.name._id}
					name={item.name}
					numberOfPeople={item.numberOfPeople}
					ingredients={item.ingredients}
					onRemove={() => removeRecipeBookItem(item)}
					categoryItem={categoryItem}
				/>
			))}
		</section>
	);
}
