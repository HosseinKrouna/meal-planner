function NutritionalValuesPerServing({ foundedRecipes }) {
	const recipe = foundedRecipes[0]?.name.nutritionalValuesPerServing;

	return (
		<>
			<div class="flex mt-10 items-center">
				<div class="flex-grow border-b-2 border-green-600"></div>
				<h2 class="text-2xl font-medium mx-4">Nährwerte pro Portion</h2>
				<div class="flex-grow border-b-2 border-green-600"></div>
			</div>

			<div className="flex flex-col items-center mt-2">
				<div className="flex flex-wrap justify-center mt-5">
					<div className="flex flex-col items-center mx-4 my-2">
						<span className="font-medium">Kalorien</span>
						<span className="text-green-600 font-semibold text-lg">
							{recipe.calories} kcal
						</span>
					</div>

					<div className="flex flex-col items-center mx-4 my-2">
						<span className="font-medium">Kohlenhydrate</span>
						<span className="text-green-600 font-semibold text-lg">
							{recipe.carbohydrates} g
						</span>
					</div>

					<div className="flex flex-col items-center mx-4 my-2">
						<span className="font-medium">Eiweiss</span>
						<span className="text-green-600 font-semibold text-lg">
							{recipe.protein} g
						</span>
					</div>

					<div className="flex flex-col items-center mx-4 my-2">
						<span className="font-medium">Fett</span>
						<span className="text-green-600 font-semibold text-lg">
							{recipe.fat} g
						</span>
					</div>

					<div className="flex flex-col items-center mx-4 my-2">
						<span className="font-medium">Ballaststoffe</span>
						<span className="text-green-600 font-semibold text-lg">
							{recipe.fiber} g
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default NutritionalValuesPerServing;
