import { useState } from "react";
import IngredientList from "@/components/layout/IngredientList";

function MenuItemIngredientsListProps({ ingredientsList, setIngredientsList }) {
	const [newIngredientsGroup, setNewIngredientsGroup] = useState("");

	const addIngredientsGroup = () => {
		if (newIngredientsGroup.trim() !== "") {
			setIngredientsList((prevIngredientsList) => {
				const lastGroup = prevIngredientsList[prevIngredientsList.length - 1];

				if (
					lastGroup &&
					lastGroup.ingredients.length === 1 &&
					lastGroup.ingredients[0].ingredientName === ""
				) {
					return [
						...prevIngredientsList.slice(0, -1),
						{
							...lastGroup,
							ingredientsGroup: newIngredientsGroup,
						},
					];
				} else {
					return [
						...prevIngredientsList,
						{
							ingredientsGroup: newIngredientsGroup,
							ingredients: [
								{
									ingredientName: "",
									quantity: 0,
									unit: "",
								},
							],
						},
					];
				}
			});

			setNewIngredientsGroup("");
		}
	};

	const updateIngredientsGroup = (index, updatedIngredientsGroup) => {
		const updatedList = [...ingredientsList];
		updatedList[index].ingredientsGroup = updatedIngredientsGroup;
		setIngredientsList(updatedList);
	};

	const removeIngredientGroup = (groupIndex) => {
		setIngredientsList((prevIngredientsList) =>
			prevIngredientsList.filter((group, index) => index !== groupIndex)
		);
	};

	const addIngredientToGroup = (groupIndex) => {
		setIngredientsList((prevIngredientsList) => {
			const updatedList = [...prevIngredientsList];
			const currentIngredients = updatedList[groupIndex]?.ingredients || [];

			const hasDefaultIngredient = currentIngredients.some(
				(ingredient) =>
					ingredient.ingredientName === "" &&
					ingredient.quantity === 0 &&
					ingredient.unit === ""
			);

			if (!hasDefaultIngredient) {
				updatedList[groupIndex]?.ingredients.push({
					ingredientName: "",
					quantity: 0,
					unit: "",
				});
			}

			return updatedList;
		});
	};

	const editIngredientProp = (groupIndex, ingredientIndex, propName, value) => {
		setIngredientsList((prevIngredientsList) => {
			const updatedList = [...prevIngredientsList];
			updatedList[groupIndex].ingredients[ingredientIndex][propName] = value;
			return updatedList;
		});
	};
	const onRemoveIngredient = (groupIndex, ingredientIndex) => {
		setIngredientsList((prevIngredientsList) => {
			const updatedList = [...prevIngredientsList];

			if (
				updatedList[groupIndex] &&
				updatedList[groupIndex].ingredients &&
				updatedList[groupIndex].ingredients[ingredientIndex]
			) {
				const updatedIngredients = updatedList[groupIndex].ingredients.filter(
					(_, index) => index !== ingredientIndex
				);

				const updatedGroup = {
					...updatedList[groupIndex],
					ingredients: updatedIngredients,
				};

				updatedList[groupIndex] = updatedGroup;

				return updatedList;
			}

			return updatedList;
		});
	};

	return (
		<div className="bg-gray-300 rounded-md p-2 mb-3">
			{ingredientsList.length > 0 && (
				<div className="mb-4">
					<label className="text-lg font-bold">Zutatenliste</label>
				</div>
			)}
			<div>
				<label>Zutatengruppe</label>
				<input
					type="text"
					placeholder="Gruppe"
					value={newIngredientsGroup}
					onChange={(e) => setNewIngredientsGroup(e.target.value)}
					className="mt-1"
				/>
				<button
					type="button"
					onClick={addIngredientsGroup}
					className="mb-3 bg-white"
				>
					Zutatengruppe hinzufügen
				</button>
				<div className="m-2 bg-gray-400">
					{ingredientsList?.map((group, groupIndex) => (
						<IngredientList
							key={groupIndex}
							group={group}
							groupIndex={groupIndex}
							onUpdateGroup={updateIngredientsGroup}
							onRemoveGroup={() => removeIngredientGroup(groupIndex)}
							onAddIngredient={() => addIngredientToGroup(groupIndex)}
							onEditIngredient={editIngredientProp}
							onRemoveIngredient={onRemoveIngredient}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default MenuItemIngredientsListProps;
