import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";
import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import Ingredient from "@/components/layout/Ingredient";
import { useState } from "react";

function IngredientList({
	group,
	groupIndex,
	onUpdateGroup,
	onRemoveGroup,
	onAddIngredient,
	onEditIngredient,
	onRemoveIngredient,
}) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<div className="bg-gray-200 p-2 shadow-md rounded-md mb-2">
			<button
				onClick={handleToggle}
				className="flex items-center w-full p-2 border-0 justify-start"
				type="button"
			>
				{isOpen ? (
					<ChevronUp className="w-6 h-6" />
				) : (
					<ChevronDown className="w-6 h-6" />
				)}
				<span className="ml-2">{group.ingredientsGroup}</span>
			</button>

			{isOpen && (
				<div className="flex flex-col gap-2 mt-2">
					<div>
						<label className="font-bold">Name der Zutatengruppe</label>
						<input
							type="text"
							value={group.ingredientsGroup}
							onChange={(e) => onUpdateGroup(groupIndex, e.target.value)}
							className="border p-2 rounded-md mt-1 mb-2 block w-full"
						/>
					</div>
					{group.ingredients.map((ingredient, ingredientIndex) => (
						<Ingredient
							key={ingredientIndex}
							ingredient={ingredient}
							groupIndex={groupIndex}
							ingredientIndex={ingredientIndex}
							onEditIngredient={onEditIngredient}
							onRemoveIngredient={onRemoveIngredient}
						/>
					))}
					<div className="flex items-center">
						<button
							type="button"
							onClick={() => onAddIngredient(groupIndex)}
							className="bg-green-500 items-center ml-2"
						>
							<Plus className="w-4 h-4" />
							<span>Weitere Zutat hinzufügen</span>
						</button>
					</div>
					<div>
						<button
							type="button"
							onClick={() => onRemoveGroup(groupIndex)}
							className="bg-white border p-2 mt-5 rounded-md w-full"
						>
							<Trash />
							Zutatengruppe entfernen
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default IngredientList;
