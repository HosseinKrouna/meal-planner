import { useEffect, useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemIngredientsListProps from "@/components/layout/MenuItemIngredientsListProps";

function MenuItemForm({ onSubmit, menuItem }) {
	const [image, setImage] = useState(menuItem?.image || "");
	const [recipeName, setRecipeName] = useState(menuItem?.recipeName || "");
	const [description, setDescription] = useState(menuItem?.description || "");
	const [category, setCategory] = useState(menuItem?.category || "");
	const [categories, setCategories] = useState([]);
	const [numberOfPeople, setNumberOfPeople] = useState(
		menuItem?.numberOfPeople || 0
	);
	const [ingredientsList, setIngredientsList] = useState(
		menuItem?.ingredientsList || []
	);

	useEffect(() => {
		fetch("/api/categories").then((res) => {
			res.json().then((categories) => {
				setCategories(categories);
			});
		});
	}, []);

	return (
		<form
			onSubmit={(event) =>
				onSubmit(event, {
					numberOfPeople,
					image,
					recipeName,
					description,
					category,
					ingredientsList,
				})
			}
			className="max-w-2xl mx-auto mt-8"
		>
			<div
				className="md:grid items-start gap-4"
				style={{ gridTemplateColumns: ".3fr .7fr" }}
			>
				<div>
					<EditableImage link={image} setLink={setImage} />
				</div>
				<div className="grow">
					<label>Rezeptname</label>
					<input
						type="text"
						value={recipeName}
						onChange={(event) => setRecipeName(event.target.value)}
					/>

					<label>Beschreibung</label>
					<input
						type="text"
						value={description}
						onChange={(event) => setDescription(event.target.value)}
					/>

					<label>Kategorie</label>
					<select
						value={category}
						onChange={(event) => setCategory(event.target.value)}
					>
						<option value="">Bitte wähle eine Kategorie aus</option>
						{categories?.length > 0 &&
							categories.map((categoryFromMap) => (
								<option key={categoryFromMap._id} value={categoryFromMap._id}>
									{categoryFromMap.name}
								</option>
							))}
					</select>

					<label>Anzahl der Personen</label>
					<input
						type="number"
						value={numberOfPeople}
						onChange={(event) => setNumberOfPeople(event.target.value)}
						className="border w-20 border-gray-300 rounded-md p-2 focus:outline-none mx-1 my-4 focus:border-blue-500"
						onFocus={(event) => event.target.select()}
					/>
					<MenuItemIngredientsListProps
						ingredientsList={ingredientsList}
						setIngredientsList={setIngredientsList}
					/>
					<button type="submit" className="mb-2">
						Speichern
					</button>
				</div>
			</div>
		</form>
	);
}

export default MenuItemForm;
