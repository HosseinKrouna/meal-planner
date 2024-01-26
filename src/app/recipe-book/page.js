"use client";
import { RecipeBookContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
// import Image from "next/image";
import { useContext } from "react";
// import toast from "react-hot-toast";
import RecipeBookItem from "@/components/menu/RecipeBookItem";

export default function RecipeBookPage() {
	const { recipeBookItems, removeRecipeBookItem } =
		useContext(RecipeBookContext);

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
