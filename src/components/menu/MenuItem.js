import Image from "next/image";
import { useContext, useState } from "react";
import { RecipeBookContext } from "../AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";

function MenuItem(menuItem) {
	const { image, recipeName, description, numberOfPeople, ingredientsList } =
		menuItem;

	const [showPopup, setShowPopup] = useState(false);

	const { addToRecipeBook } = useContext(RecipeBookContext);

	async function handleAddToRecipeBookButtonClick() {
		setShowPopup(false);

		addToRecipeBook(menuItem);
		await new Promise((resolve) => setTimeout(resolve, 1000));
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
							<div className="mx-auto">
								<Image src={image} alt={recipeName} width={160} height={80} />
							</div>
							<h2 className="text-lg font-bold text-center mb-2">
								{recipeName}
							</h2>
							<p className="text-center text-gray-500 text-sm mb-2">
								{description}
							</p>
							{/* <span>
								{numberOfPeople}{" "}
								{ingredientsList
									.map((ingredient) => ingredient.ingredients[0].ingredientName)
									.join(", ")}
							</span> */}
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
