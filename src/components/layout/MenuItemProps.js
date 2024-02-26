"use client";

import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";
import { useState } from "react";
import MenuItemPropsGroup from "@/components/menu/MenuItemPropsGroup";

function MenuItemProps({ ingredientsGroups, setIngredientsGroups }) {
	const [isOpen, setIsOpen] = useState(false);

	function addIngredientsGroup() {
		setIngredientsGroups((prevGroups) => [
			...prevGroups,
			{ groupName: "", ingredients: [] },
		]);
	}

	function removeIngredientsGroup(indexToRemove) {
		setIngredientsGroups((prevGroups) =>
			prevGroups.filter((group, index) => index !== indexToRemove)
		);
	}

	return (
		<div className="bg-gray-200 p-2 rounded-md mb-2">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="inline-flex p-1 border-0 justify-start"
				type="button"
			>
				{isOpen && <ChevronUp />}
				{!isOpen && <ChevronDown />}
				<span>Zutatenliste</span>
				<span>({ingredientsGroups?.length})</span>
			</button>
			<div className={isOpen ? "block" : "hidden"}>
				{Array.isArray(ingredientsGroups) &&
					ingredientsGroups.map((group, index) => (
						<div key={index} className="mb-4">
							<div className="flex items-center">
								<label className="mr-2">Name der Zutatengruppe</label>
								<input
									type="text"
									value={group.groupName}
									onChange={(e) => {
										const newGroups = [...ingredientsGroups];
										newGroups[index].groupName = e.target.value;
										setIngredientsGroups(newGroups);
									}}
									className="border w-40 border-gray-300 rounded-md p-2 focus:outline-none mx-1 my-4 focus:border-blue-500"
									onFocus={(event) => event.target.select()}
								/>
								<button
									type="button"
									onClick={() => removeIngredientsGroup(index)}
									className="bg-white w-full border p-2 m-2 mt-5"
								>
									<Trash />
								</button>
							</div>

							{/* //FIXME - Ingredients editable


							<MenuItemPropsGroup
								ingredients={group.ingredients}
								setIngredients={(newIngredients) => {
									const newGroups = [...ingredientsGroups];
									newGroups[index].ingredients = newIngredients;
									setIngredientsGroups(newGroups);
								}}
							/> */}
						</div>
					))}
				<button
					type="button"
					onClick={addIngredientsGroup}
					className="bg-white items-center"
				>
					<Plus className="w-4 h-4" />
					<span>Füge Zutatengruppe hinzu</span>
				</button>
			</div>
		</div>
	);
}

export default MenuItemProps;
