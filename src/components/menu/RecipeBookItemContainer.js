import RecipeBookItem from "@/components/menu/RecipeBookItem";

export default function RecipeBookItemContainer({
	categoryItem,
	recipeBookItems,
	removeRecipeBookItem,
}) {
	const filteredRecipes = recipeBookItems
		? recipeBookItems.filter((item) => item.name.category === categoryItem?._id)
		: [];

	return (
		<div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
			{filteredRecipes.map((recipeItem) => (
				<div
					key={recipeItem._id || recipeItem.name._id}
					className="recipe-card-container"
				>
					{recipeItem.name && (
						<RecipeBookItem
							recipeBookItemsId={recipeItem.name._id}
							key={recipeItem._id}
							name={recipeItem.name}
							numberOfPeople={recipeItem.name.numberOfPeople}
							ingredients={recipeItem.name.ingredients}
							onRemove={() => removeRecipeBookItem(recipeItem)}
							categoryItem={categoryItem}
						/>
					)}
				</div>
			))}
		</div>
	);
}
