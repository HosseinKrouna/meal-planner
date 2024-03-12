import React from "react";

function HighlightIngredients({ description }) {
	const highlightedIngredients = [
		"Karotten",
		"100 g",
		"Haferflocken",
		"Sonnenblumenkernen",
		"Tomatenmark",
		"Mandelmus",
		"Tofu",
		"Zwiebeln",
		"Olivenöl",
		"Zwiebelwürfel",
		"1 ½ TL",
		"Paprikapulver",
		"TL Kreuzkümmel",
		//FIXME - "½" is not highlighted
		"½",
		"Salz und Pfeffer",
		"1 EL",
		"1 gestrichenen TL Backpulver",
		"Thymian",
		"30 g",
		"Butter",
		"20 g",
		"Mehl",
		"300 ml",
		"Hafermilch",
		"100 ml ",
		"Hafersahne",
		"Salz",
		"Pfeffer.",
		"3 Prisen",
		"Muskatnuss",
		"Wirsing",
		"1 - 2 EL",
		"Senf",
	];

	const highlightDescription = () => {
		let highlightedDescription = description;

		highlightedIngredients.forEach((ingredient, index) => {
			const regex = new RegExp(`\\b(${ingredient})\\b`, "gi");
			highlightedDescription = highlightedDescription.replace(
				regex,
				(match) => `<span key=${index} class="highlight">${match}</span>`
			);
		});

		return highlightedDescription;
	};

	return <div dangerouslySetInnerHTML={{ __html: highlightDescription() }} />;
}

export default HighlightIngredients;
