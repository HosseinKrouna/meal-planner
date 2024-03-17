import RecipeBookItem from "@/components/menu/RecipeBookItem";

export default function RecipeBookItemContainer({
	categoryItem,
	recipeBookItems,
	removeRecipeBookItem,
}) {
	console.log("categoryItem:", categoryItem);
	console.log("recipeBookItems:", recipeBookItems);

	// const filteredRecipes = recipeBookItems
	// 	? recipeBookItems.filter(
	// 			(item) => item.name?.category === categoryItem?._id
	// 	  )
	// 	: [];

	return (
		<div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
			{recipeBookItems.map((recipe) => (
				<div
					key={recipe._id || recipe.name._id}
					className="recipe-card-container"
				>
					{recipe._id && (
						<RecipeBookItem
							image={recipe.image}
							recipeBookItemsId={recipe._id}
							key={recipe._id}
							name={recipe.name}
							numberOfPeople={recipe.numberOfPeople}
							ingredients={recipe.ingredients}
							onRemove={() => removeRecipeBookItem(recipe)}
							categoryItem={categoryItem}
						/>
					)}
				</div>
			))}
		</div>
	);
}
