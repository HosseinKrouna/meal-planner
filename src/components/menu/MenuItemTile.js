import Image from "next/image";
import { useState } from "react";
import AddToRecipeBookButton from "@/components/menu/AddToRecipeBookButton";

export default function MenuItemTile({ onAddToRecipeBook, ...item }) {
	const {
		image,
		recipeName,
		description,
		preparation,
		nutritionalValuesPerServing,
	} = item;
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
							className="overflow-y-auto p-2 mt-4 px-4"
							style={{ maxHeight: "calc(100vh - 100px)" }}
						>
							<Image
								src={image}
								alt={recipeName}
								width={360}
								height={280}
								className="mx-auto rounded-md"
							/>
							<h2 className="text-lg font-bold text-center my-6">
								{recipeName}
							</h2>
							<p className="text-center text-gray-500 text-sm mb-4">
								{description}
							</p>

							<div className="flex justify-center">
								<div className="text-left text-green-600 font-semibold text-lg">
									{preparation.makeReadyTime} Minuten
								</div>
							</div>
						</div>
						<div className=" mt-5">
							<div className="w-1/2">
								<span className="font-medium">Koch-/Backzeit</span>
							</div>
							<div className="flex justify-center">
								<div className="text-left text-green-600 font-semibold text-lg">
									{preparation.cookingBakingTime} Minuten
								</div>
							</div>
						</div>

						<div className="flex mt-10 items-center">
							<div className="flex-grow border-b-2 border-green-600"></div>
							<h2 className="text-2xl font-medium mx-4">
								Nährwerte pro Portion
							</h2>
							<div className="flex-grow border-b-2 border-green-600"></div>
						</div>

						<div className="flex flex-col items-center mt-2">
							<div className="flex flex-wrap justify-center mt-5">
								<div className="flex flex-col items-center mx-4 my-2">
									<span className="font-medium">Kalorien</span>
									<span className="text-green-600 font-semibold text-lg">
										{nutritionalValuesPerServing.calories} kcal
									</span>
								</div>

								<div className="flex flex-col items-center mx-4 my-2">
									<span className="font-medium">Kohlenhydrate</span>
									<span className="text-green-600 font-semibold text-lg">
										{nutritionalValuesPerServing.carbohydrates} g
									</span>
								</div>

								<div className="flex flex-col items-center mx-4 my-2">
									<span className="font-medium">Eiweiss</span>
									<span className="text-green-600 font-semibold text-lg">
										{nutritionalValuesPerServing.protein} g
									</span>
								</div>

								<div className="flex flex-col items-center mx-4 my-2">
									<span className="font-medium">Fett</span>
									<span className="text-green-600 font-semibold text-lg">
										{nutritionalValuesPerServing.fat} g
									</span>
								</div>

								<div className="flex flex-col items-center mx-4 my-2">
									<span className="font-medium">Ballaststoffe</span>
									<span className="text-green-600 font-semibold text-lg">
										{nutritionalValuesPerServing.fiber} g
									</span>
								</div>
							</div>
						</div>
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
			)}
		</div>
	);
}
