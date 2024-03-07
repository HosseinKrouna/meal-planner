"use client";

import { useContext, useEffect, useState } from "react";
import { RecipeBookContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import RecipeBookItemContainer from "@/components/menu/RecipeBookItemContainer";
import { FaTrash } from "react-icons/fa";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import DeleteButton from "@/components/layout/DeleteButton";

export default function RecipeBookPage() {
	const handleClearAll = () => {
		localStorage.removeItem("recipe-book");
		setRecipeBookItems([]);
	};

	const { recipeBookItems, setRecipeBookItems, removeRecipeBookItem } =
		useContext(RecipeBookContext);

	const [categories, setCategories] = useState([]);
	const [openCategories, setOpenCategories] = useState({}); // Zustand für geöffnete Kategorien

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

	const toggleCategory = (categoryId) => {
		setOpenCategories((prevOpenCategories) => ({
			...prevOpenCategories,
			[categoryId]: !prevOpenCategories[categoryId],
		}));
	};

	return (
		<section className="mt-8">
			<div className="flex">
				<div className="mb-4 flex-1">
					<SectionHeaders mainHeader="Rezeptbuch" />
				</div>
				<div className=" ml-4">
					<DeleteButton label="Alle löschen" onDelete={handleClearAll} />
				</div>
			</div>

			{categories?.length > 0 &&
				categories.map((categoryItem) => (
					<div key={categoryItem._id}>
						<div className="text-center border rounded-md p-2 my-2 bg-gray-200 border-gray-300 shadow-md">
							<div
								className="flex items-center justify-between cursor-pointer"
								onClick={() => toggleCategory(categoryItem._id)}
							>
								<SectionHeaders mainHeader={categoryItem.name} />
								{openCategories[categoryItem._id] ? (
									<ChevronUp />
								) : (
									<ChevronDown />
								)}
							</div>
						</div>

						{openCategories[categoryItem._id] && (
							<div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
								{recipeBookItems?.length > 0 && (
									<RecipeBookItemContainer
										categoryItem={categoryItem}
										recipeBookItems={recipeBookItems}
										removeRecipeBookItem={(item) => removeRecipeBookItem(item)}
										recipeBookItemsId={recipeBookItems._id}
									/>
								)}
							</div>
						)}
					</div>
				))}
		</section>
	);
}
