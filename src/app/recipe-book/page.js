"use client";

import { useContext, useEffect, useState } from "react";
import { RecipeBookContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import RecipeBookItemContainer from "@/components/menu/RecipeBookItemContainer";
import { FaTrash } from "react-icons/fa";

export default function RecipeBookPage() {
	const handleClearAll = () => {
		localStorage.removeItem("recipe-book");
		setRecipeBookItems([]);
	};

	const { recipeBookItems, setRecipeBookItems, removeRecipeBookItem } =
		useContext(RecipeBookContext);

	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/categories")
			.then((res) => res.json())
			.then((categories) => setCategories(categories));
		setLoading(false);
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

	if (!categories || categories.length === 0) {
		return (
			<section className="mt-8 text-center">
				<SectionHeaders mainHeader="Rezeptbuch" />
				<p className="mt-4">Dein Rezeptbuch ist leer 😔</p>
			</section>
		);
	}

	return (
		<section className="mt-8">
			<div className="flex">
				<div className="text-start">
					<SectionHeaders mainHeader="Rezeptbuch" />
				</div>
				<div className="flex ml-4">
					<button
						onClick={handleClearAll}
						className="bg-red-500 text-white p-2 ml-6 rounded flex items-center "
					>
						<FaTrash />
						Alle löschen
					</button>
				</div>
			</div>

			{categories?.length > 0 &&
				categories.map((categoryItem) => (
					<div key={categoryItem._id}>
						<div className="text-center mt-10">
							<SectionHeaders mainHeader={categoryItem.name} />
						</div>
						<div className="mt-12">
							{recipeBookItems?.length > 0 && (
								<RecipeBookItemContainer
									categoryItem={categoryItem}
									recipeBookItems={recipeBookItems}
									removeRecipeBookItem={(item) => removeRecipeBookItem(item)}
									recipeBookItemsId={recipeBookItems._id}
								/>
							)}
						</div>
					</div>
				))}
		</section>
	);
}
