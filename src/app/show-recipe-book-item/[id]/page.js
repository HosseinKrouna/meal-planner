"use client";

import React from "react";
import HighlightIngredients from "@/components/layout/HighlightIngredients";
import { useContext, useEffect, useState } from "react";
import { RecipeBookContext } from "@/components/AppContext";
import { useParams } from "next/navigation";
import Image from "next/image";
import NutritionalValuesPerServing from "@/components/layout/NutritionalValuesPerServing";

function ShowRecipeItemPage() {
	const { recipeBookItems, setRecipeBookItems } = useContext(RecipeBookContext);

	const { id } = useParams();
	const [loading, setLoading] = useState(true);

	const foundedRecipes = recipeBookItems
		? recipeBookItems.filter((item) => item.name._id === id)
		: [];

	console.log("foundedRecipes: ", foundedRecipes);

	const getRecipeBookItemsFromLocalStorage = () => {
		const ls = typeof window !== "undefined" ? window.localStorage : null;

		if (ls && ls.getItem("recipe-book")) {
			return JSON.parse(ls.getItem("recipe-book"));
		}

		return [];
	};

	useEffect(() => {
		const storedRecipeBookItems = getRecipeBookItemsFromLocalStorage();

		if (storedRecipeBookItems.length > 0) {
			setRecipeBookItems(storedRecipeBookItems);
		}

		setLoading(false);
	}, [setRecipeBookItems]);

	if (loading) {
		return <p>Lade Rezeptdaten...</p>;
	}

	return (
		<section className="mt-8 mx-auto max-w-2xl">
			<div className="text-center mb-8">
				<Image
					src={foundedRecipes[0]?.name?.image}
					alt="Recipe image"
					width={600}
					height={400}
					className="rounded-lg mx-auto"
				/>
				<h1 className="text-4xl font-bold mt-4">
					{foundedRecipes[0]?.name?.recipeName}
				</h1>
				<p className="text-gray-600 mt-4 text-lg">
					Zutaten für {foundedRecipes[0]?.name?.numberOfPeople} Personen
				</p>

				<ul className="pl-6 mt-10 space-y-4">
					{foundedRecipes[0]?.name?.ingredientsList.map((group, groupIndex) => (
						<li key={groupIndex} className="mb-2">
							<div className="mb-4 mt-10">
								<span className="font-semibold text-2xl">
									{group.ingredientsGroup}
								</span>
							</div>

							<ul className="flex flex-col space-y-2 items-start">
								{group.ingredients.map((ingredient, ingredientIndex) => (
									<div className="flex" key={ingredientIndex}>
										<li className="space-x-4">
											<div className="flex justify-between items-center">
												<div className="px-2">
													<input type="checkbox" />
												</div>
												<div className="text-lg " style={{ width: "120px" }}>
													<span>{ingredient.quantity}</span>{" "}
													<span>{ingredient.unit}</span>
												</div>
												<div className="font-medium text-lg pl-8 ">
													<span>{ingredient.ingredientName}</span>
												</div>
											</div>
										</li>
									</div>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>
			<div className="mt-10">
				<NutritionalValuesPerServing foundedRecipes={foundedRecipes} />
			</div>

			<div className="flex mt-10">
				<h2 class="text-3xl font-bold">Zubereitung</h2>
			</div>
			<div class="flex mt-8 items-center">
				<div class="flex-grow border-b-2 border-green-600"></div>
				<h2 class="text-2xl font-medium mx-4">Zubereitungszeit:</h2>
				<div class="flex-grow border-b-2 border-green-600"></div>
			</div>

			<div className="flex justify-center">
				<div className=" mt-5">
					<div className="w-1/2 mr-5">
						<span className="font-medium">Vorbereitungszeit</span>
					</div>
					<div className="flex justify-center">
						<div className="text-left text-green-600 font-semibold text-lg">
							{foundedRecipes[0]?.name.preparation.makeReadyTime} Minuten
						</div>
					</div>
				</div>
				<div className=" mt-5">
					<div className="w-1/2">
						<span className="font-medium">Koch-/Backzeit</span>
					</div>
					<div className="flex justify-center">
						<div className="text-left text-green-600 font-semibold text-lg">
							{foundedRecipes[0]?.name.preparation.cookingBakingTime} Minuten
						</div>
					</div>
				</div>
			</div>

			<div className="flex ">
				<div className="mt-10">
					{foundedRecipes[0]?.name.steps.map((step, index) => (
						<div key={index}>
							<div className="mb-4 text-2xl mt-6 font-bold text-green-500">
								{step.stepName}
							</div>
							<HighlightIngredients description={step.preparationDescription} />{" "}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default ShowRecipeItemPage;
