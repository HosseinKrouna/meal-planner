import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import { useState } from "react";
import ChevronUp from "../icons/ChevronUp";
import ChevronDown from "../icons/ChevronDown";

function MenuItemPropsGroup({ ingredients, setIngredients }) {
	const [isOpen, setIsOpen] = useState(false);

	function addIngredient() {
		setIngredients((prevIngredients) => [
			...prevIngredients,
			{ name: "", quantity: 0, unit: "" },
		]);
	}

	function removeIngredient(indexToRemove) {
		setIngredients((prevIngredients) =>
			prevIngredients.filter((v, index) => index !== indexToRemove)
		);
	}

	return (
		<div className="bg-gray-100 p-2 rounded-md mb-2">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="inline-flex p-1 border-0 justify-start"
				type="button"
			>
				{isOpen && <ChevronUp />}
				{!isOpen && <ChevronDown />}
				<span>Zutaten</span>
				<span>({ingredients?.length})</span>
			</button>
			<div className={isOpen ? "block" : "hidden"}>
				{Array.isArray(ingredients) &&
					ingredients.map((ingredient, index) => (
						<div key={index} className="flex gap-2 mb-2">
							<div className="flex-2">
								<label>Name</label>
								<input
									type="text"
									placeholder="Zutaten"
									value={ingredient.name}
									onChange={(ev) => {
										const newIngredients = [...ingredients];
										newIngredients[index] = {
											...newIngredients[index],
											name: ev.target.value,
										};
										setIngredients(newIngredients);
									}}
									className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
								/>
							</div>
							<div className="flex-1">
								<label>Menge</label>
								<input
									type="number"
									placeholder="0"
									value={ingredient.quantity}
									onChange={(ev) => {
										const newIngredients = [...ingredients];
										newIngredients[index] = {
											...newIngredients[index],
											quantity: ev.target.value,
										};
										setIngredients(newIngredients);
									}}
									className="w-full p-2 mx-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
								/>
							</div>
							<div className="flex-2">
								<label className="ml-3">Einheit</label>
								<select
									value={ingredient.unit}
									onChange={(ev) => {
										const newIngredients = [...ingredients];
										newIngredients[index] = {
											...newIngredients[index],
											unit: ev.target.value,
										};
										setIngredients(newIngredients);
									}}
									className="w-full mx-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
								>
									<option>X</option>
									<option>X</option>
									<option>X</option>
									<option>X</option>
									<option>X</option>
								</select>
							</div>
							<div className="flex items-center">
								<button
									type="button"
									onClick={() => removeIngredient(index)}
									className="bg-white w-full border p-2 m-2 mt-5"
								>
									<Trash />
								</button>
							</div>
						</div>
					))}
				<button
					type="button"
					onClick={addIngredient}
					className="bg-white items-center"
				>
					<Plus className="w-4 h-4" />
					<span>Füge Zutat hinzu</span>
				</button>
			</div>
		</div>
	);
}

export default MenuItemPropsGroup;
