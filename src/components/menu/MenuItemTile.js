import Image from "next/image";
import { useState } from "react";
import AddToRecipeBookButton from "@/components/menu/AddToRecipeBookButton";

export default function MenuItemTile({ onAddToRecipeBook, ...item }) {
	const { image, recipeName, description, numberOfPeople, ingredientsList } =
		item;
	const [showPreview, setShowPreview] = useState(false);

	function handlePreviewButtonClick() {
		setShowPreview(true);
	}

	function handleAddToRecipeBook() {
		onAddToRecipeBook();
		setTimeout(() => {
			setShowPreview(false);
		}, 3000);
	}

	return (
		<div className=" bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
			<div className="text-center">
				<Image
					src={image}
					className="max-h-auto max-h-24 block mx-auto"
					alt="Recipe image"
					width={220}
					height={150}
				/>
			</div>
			<h4 className="font-semibold text-xl my-3 mt-8">{recipeName}</h4>
			<AddToRecipeBookButton image={image} onClick={onAddToRecipeBook} />
			<div className="mt-4">
				<button className="bg-white" onClick={handlePreviewButtonClick}>
					Vorschau
				</button>
			</div>

			{/* Vorschau-Komponente */}
			{showPreview && (
				<div
					className="fixed inset-0 bg-black/80 flex items-center justify-center"
					onClick={() => setShowPreview(false)} // Deaktiviert die Vorschau beim Klicken außerhalb
				>
					<div
						onClick={(ev) => ev.stopPropagation()}
						className="my-8 bg-white p-2 rounded-lg max-w-md"
					>
						<div
							className="overflow-y-scroll p-2 mt-4 px-4"
							style={{ maxHeight: "calc(100vh - 100px)" }}
						>
							<Image
								src={image}
								alt={recipeName}
								width={160}
								height={80}
								className="mx-auto"
							/>
							<h2 className="text-lg font-bold text-center my-6">
								{recipeName}
							</h2>
							<p className="text-center text-gray-500 text-sm mb-4">
								{description}
							</p>
							<p>Anzahl der Personen: {numberOfPeople}</p>
							<p>
								Zutaten:{" "}
								{ingredientsList
									.map((ingredient) => ingredient.name)
									.join(", ")}
							</p>
							<div className="flex justify-center items-center">
								<div className="p-4">
									<AddToRecipeBookButton
										image={image}
										onClick={handleAddToRecipeBook}
									/>
								</div>
								<button onClick={() => setShowPreview(false)}>Abbrechen</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
