import { useEffect, useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemProps from "@/components/layout/MenuItemProps";
import Plus from "../icons/Plus";

function MenuItemForm({ onSubmit, menuItem }) {
	const [image, setImage] = useState(menuItem?.image || "");
	const [description, setDescription] = useState(menuItem?.description || "");
	const [name, setName] = useState(menuItem?.name || "");
	const [numberOfPeople, setNumberOfPeople] = useState(
		menuItem?.numberOfPeople || 0
	);
	const [category, setCategory] = useState(menuItem?.category || "");
	const [categories, setCategories] = useState([]);
	const [ingredientsGroups, setIngredientsGroups] = useState(
		menuItem?.ingredientsList || []
	);
	const [currentGroupName, setCurrentGroupName] = useState("");

	useEffect(() => {
		fetch("/api/categories").then((res) => {
			res.json().then((categories) => {
				setCategories(categories);
			});
		});
	}, []);

	function handleAddingredientGroup() {
		if (currentGroupName.trim() !== "") {
			setIngredientsGroups((prevIngredientsGroups) => [
				...prevIngredientsGroups,
				{ groupName: currentGroupName, ingredients: [] },
			]);
			setCurrentGroupName(""); // Zurücksetzen des aktuellen Gruppennamens
		}
	}

	return (
		<form
			onSubmit={(event) =>
				onSubmit(event, {
					numberOfPeople,
					image,
					name,
					description,
					category,
					ingredientsGroups,
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
						value={name}
						onChange={(event) => setName(event.target.value)}
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
					<div className="flex items-center">
						<label>Name der Zutatengruppe</label>
						<input
							type="text"
							value={currentGroupName}
							onChange={(event) => setCurrentGroupName(event.target.value)}
							className="border w-20 border-gray-300 rounded-md p-2 focus:outline-none mx-1 my-4 focus:border-blue-500"
							onFocus={(event) => event.target.select()}
						/>
						<div
							onClick={handleAddingredientGroup}
							className="bg-green-500 p-3 text-white 2xl hover:cursor-pointer font-bold border-green-700 rounded-md"
						>
							<Plus />
						</div>
					</div>

					<MenuItemProps
						ingredientsGroups={ingredientsGroups}
						setIngredientsGroups={setIngredientsGroups}
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
