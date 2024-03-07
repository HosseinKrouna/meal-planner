import Trash from "@/components/icons/Trash";

function Ingredient({
	ingredient,
	groupIndex,
	ingredientIndex,
	onEditIngredient,
	onRemoveIngredient,
}) {
	const handleRemoveIngredient = () => {
		onRemoveIngredient(groupIndex, ingredientIndex);
	};

	return (
		<div className="bg-gray-300 mb-2 p-2 flex flex-col gap-2 justify-center">
			<div>
				<label className="font-bold">Neue Zutat</label>
				<input
					type="text"
					placeholder="Zutatenname"
					value={ingredient.ingredientName}
					onChange={(ev) =>
						onEditIngredient(
							groupIndex,
							ingredientIndex,
							"ingredientName",
							ev.target.value
						)
					}
					className="border-2 border-green-500 p-2 rounded-md mt-1 mb-2 block w-full focus:outline-none focus:border-green-500"
				/>
			</div>
			<div className="flex items-center w-full">
				<div className="w-1/2 pr-2 flex flex-col">
					<label className="font-bold">Menge</label>
					<input
						//FIXME - Do not transfer the default value 0,
						//instead send an empty div if no information
						//other than the name is necessary to get the
						//appropriate size such as the div of the unit
						//and quantity for the ShowRecipePage.
						type="number"
						placeholder="0"
						value={ingredient.quantity}
						onChange={(ev) =>
							onEditIngredient(
								groupIndex,
								ingredientIndex,
								"quantity",
								ev.target.value
							)
						}
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
					/>
				</div>
				<div className="w-1/2 flex flex-col">
					<label className="font-bold">Einheit</label>
					<select
						value={ingredient.unit}
						onChange={(ev) =>
							onEditIngredient(
								groupIndex,
								ingredientIndex,
								"unit",
								ev.target.value
							)
						}
						className="w-full px-2 border mb-0 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
					>
						<option value="">X</option>
						<option value="g">g</option>
						<option value="Stück">Stk</option>
						<option value="EL">EL</option>
						<option value="TL">TL</option>
						<option value="ml">ml</option>
						<option value="Bund">Bund</option>
						<option value="Prise(n)">{"Prise(n)"}</option>
					</select>
				</div>
			</div>
			<div className="w-full mt-2">
				<button
					type="button"
					onClick={handleRemoveIngredient}
					className="text-red-500 bg-white p-2 w-full rounded-md"
				>
					<Trash />
				</button>
			</div>
		</div>
	);
}

export default Ingredient;
