"use client";

import { useContext, useEffect, useState } from "react";
import { RecipeBookContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import RecipeBookItemContainer from "@/components/menu/RecipeBookItemContainer";

export default function RecipeBookPage() {
	const { recipeBookItems, setRecipeBookItems, removeRecipeBookItem } =
		useContext(RecipeBookContext);

	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/categories")
			.then((res) => res.json())
			.then((categories) => setCategories(categories));
	}, []);

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

	if (recipeBookItems?.length === 0) {
		return (
			<section className="mt-8 text-center">
				<SectionHeaders mainHeader="Rezeptbuch" />
				<p className="mt-4">Dein Rezeptbuch ist leer 😔</p>
			</section>
		);
	}

	return (
		<section className="mt-8">
			<div className="text-center">
				<SectionHeaders mainHeader="Rezeptbuch" />
			</div>
			{categories?.length > 0 &&
				categories.map((categoryItem) => (
					<div key={categoryItem._id}>
						<div className="text-center">
							<SectionHeaders mainHeader={categoryItem.name} />
						</div>
						<div>
							{recipeBookItems?.length > 0 && (
								<RecipeBookItemContainer
									categoryItem={categoryItem}
									recipeBookItems={recipeBookItems}
									removeRecipeBookItem={(item) => removeRecipeBookItem(item)}
								/>
							)}
						</div>
					</div>
				))}
		</section>
	);
}
