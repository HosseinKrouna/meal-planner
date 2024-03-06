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
		<div className="flex flex-col gap-2">
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
					className="border p-2 rounded-md mt-1 mb-2 block w-full"
				/>
			</div>
			<div className="flex items-center gap-2">
				<div className="flex items-center">
					<label className="font-bold">Menge</label>
					<input
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
						className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
					/>
				</div>
				<div className="flex items-center">
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
						className="w-20 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
					>
						<option value="">X</option>
						<option value="g">g</option>
						<option value="Stück">Stk</option>
						<option value="EL">EL</option>
						<option value="TL">TL</option>
						<option value="ml">ml</option>
						<option value="Bund">Bund</option>
					</select>
				</div>
				<div className=" items-center">
					<button
						type="button"
						onClick={handleRemoveIngredient}
						className="bg-white border p-2"
					>
						<Trash />
						Zutat entfernen
					</button>
				</div>
			</div>
		</div>
	);
}

export default Ingredient;
