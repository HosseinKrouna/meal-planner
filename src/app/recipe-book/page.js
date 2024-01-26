"use client";

import { useEffect, useState } from "react";
import { RecipeBookContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext } from "react";
import RecipeBookItem from "@/components/menu/RecipeBookItem";

export default function RecipeBookPage() {
	const { recipeBookItems, removeRecipeBookItem } =
		useContext(RecipeBookContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecipeData = async () => {
			try {
				const response = await fetch("/api/menu-items");
				const data = await response.json();
				console.log(data);
				// Hier kannst du die Daten im lokalen Zustand oder localStorage speichern
				// setRecipeBookItems(data); // setze die Daten im lokalen Zustand (wenn erforderlich)
				localStorage.setItem("recipe-book", JSON.stringify(data)); // setze die Daten im localStorage
				setLoading(false);
			} catch (error) {
				console.error("Fehler beim Abrufen der Rezeptdaten:", error);
				setLoading(false);
			}
		};

		fetchRecipeData();
	}, []);

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
			<div className="mt-8 grid gap-8 grid-cols-2">
				<div>
					{recipeBookItems?.length === 0 && (
						<div>Es gibt keine Rezepte in deinem Rezeptbuch</div>
					)}
					{recipeBookItems?.length > 0 &&
						recipeBookItems.map((recipe, index) => (
							<RecipeBookItem
								key={index}
								recipe={recipe}
								onRemove={() => removeRecipeBookItem(index)}
							/>
						))}
				</div>
			</div>
		</section>
	);
}
