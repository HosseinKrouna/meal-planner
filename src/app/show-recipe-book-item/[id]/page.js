"use client";

import { useContext, useEffect, useState } from "react";
import { RecipeBookContext } from "@/components/AppContext";
import { useParams } from "next/navigation";
import Image from "next/image";

function ShowRecipeItemPage() {
	const { recipeBookItems, setRecipeBookItems } = useContext(RecipeBookContext);

	const { id } = useParams();
	const [loading, setLoading] = useState(true);

	const foundedRecipes = recipeBookItems
		? recipeBookItems.filter((item) => item.name._id === id)
		: [];

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
			<div className="text-center">
				<Image
					src={foundedRecipes[0]?.name?.image}
					alt="Recipe image"
					width={600}
					height={400}
					className="rounded-lg mx-auto"
				/>
				<h1 className="text-4xl font-bold mt-4">
					{foundedRecipes[0]?.name?.name}
				</h1>
				<p className="text-gray-600">
					Zutaten für {foundedRecipes[0]?.name?.numberOfPeople} Rouladen
				</p>
				<ul className="pl-6 mt-2">
					{foundedRecipes[0]?.name?.ingredients.map((ingredient, index) => (
						<li key={index} className="mb-1 flex items-center">
							<input type="checkbox" className="mr-2" />
							<span className="font-semibold">{ingredient.name} </span>
							<span className="ml-2">
								{ingredient.quantity} {ingredient.unit}
							</span>
						</li>
					))}
				</ul>
				<h2 className="text-2xl font-bold mt-4">Zubereitung</h2>
			</div>
		</section>
	);
}

export default ShowRecipeItemPage;
