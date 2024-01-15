import { useState } from "react";
import EditableImage from "../../components/layout/EditableImage";

function MenuItemForm({ onSubmit, menuItem }) {
	const [image, setImage] = useState(menuItem?.image || "");
	const [description, setDescreption] = useState(menuItem?.description || "");
	const [ingredients, setIngredients] = useState(menuItem?.ingredients || "");
	const [name, setName] = useState(menuItem?.name || "");

	return (
		<form
			onSubmit={(event) =>
				onSubmit(event, {
					image,
					name,
					description,
					ingredients,
				})
			}
			className=" max-w-2xl mx-auto mt-8"
		>
			<div
				className="grid items-start gap-4"
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
						onChange={(event) => setDescreption(event.target.value)}
					/>
					<label>Zutaten</label>
					<input
						type="text"
						value={ingredients}
						onChange={(event) => setIngredients(event.target.value)}
					/>
					<button type="submit" className="mb-2">
						Erstellen
					</button>
				</div>
			</div>
		</form>
	);
}

export default MenuItemForm;
