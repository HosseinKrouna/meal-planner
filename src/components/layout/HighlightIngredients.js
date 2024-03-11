import React from "react";

function HighlightIngredients({ description }) {
	const ingredientList = [
		"Paprikapulver",
		"Tofu Natur",
		"Kreuzkümmel" /* weitere Zutaten hier */,
	];

	const highlightDescription = () => {
		let highlightedDescription = description;

		ingredientList.forEach((ingredient) => {
			const regex = new RegExp(`\\b(${ingredient})\\b`, "gi");
			highlightedDescription = highlightedDescription.replace(
				regex,
				(match) => `<span class="highlight">${match}</span>`
			);
		});

		return highlightedDescription;
	};

	return <div dangerouslySetInnerHTML={{ __html: highlightDescription() }} />;
}

export default HighlightIngredients;
