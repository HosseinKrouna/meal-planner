import Image from "next/image";
import { useContext, useState } from "react";
import { RecipeBookContext } from "../AppContext";
import FlyingButton from "react-flying-item";
import MenuItemTile from "@/components/menu/MenuItemTile";

function MenuItem(menuItem) {
	const { image, name, description, numberOfPeople, ingredients } = menuItem;

	const [showPopup, setShowPopup] = useState(false);

	const { recipeBookItems, addToRecipeBook } = useContext(RecipeBookContext);

	async function handleAddToRecipeBookButtonClick() {
		console.log("add to recipe book");
		setShowPopup(true);

		addToRecipeBook(menuItem, numberOfPeople, ingredients);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log("hiding popup");
		setShowPopup(false);
	}

	return (
		<>
			{showPopup && (
				<div
					onClick={() => setShowPopup(false)}
					className="fixed inset-0 bg-black/80 flex items-center justify-center"
				>
					<div
						onClick={(ev) => ev.stopPropagation()}
						className="my-8 bg-white p-2 rounded-lg max-w-md"
					>
						<div
							className="overflow-y-scroll p-2"
							style={{ maxHeight: "calc(100vh - 100px)" }}
						>
							<Image
								src={image}
								alt={name}
								width={300}
								height={200}
								className="mx-auto"
							/>
							<h2 className="text-lg font-bold text-center mb-2">{name}</h2>
							<p className="text-center text-gray-500 text-sm mb-2">
								{description}
							</p>
							<span>
								{numberOfPeople}{" "}
								{ingredients.map((ingredient) => ingredient.name).join(", ")}
							</span>

							<FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
								<div
									className="primary sticky bottom-2"
									onClick={handleAddToRecipeBookButtonClick}
								>
									Zum Rezept hinzufügen
								</div>
							</FlyingButton>
							<button className="mt-2" onClick={() => setShowPopup(false)}>
								Abbrechen
							</button>
						</div>
					</div>
				</div>
			)}
			<MenuItemTile
				onAddToRecipeBook={handleAddToRecipeBookButtonClick}
				{...menuItem}
			/>
		</>
	);
}

export default MenuItem;
