import { useEffect, useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";

function MenuItemForm({ onSubmit, menuItem }) {
	const [image, setImage] = useState(menuItem?.image || "");
	const [description, setDescreption] = useState(menuItem?.description || "");
	const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
	const [name, setName] = useState(menuItem?.name || "");
	const [sizes, setSizes] = useState(menuItem?.sizes || []);
	const [extraIngredientPrices, setExtraIngredientPrices] = useState(
		menuItem?.extraIngredientPrices || []
	);
	const [category, setCategory] = useState(menuItem?.category || "");
	const [categories, setCategories] = useState([]);

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
					sizes,
					image,
					name,
					description,
					basePrice,
					extraIngredientPrices,
					category,
				})
			}
			className=" max-w-2xl mx-auto mt-8"
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
						onChange={(event) => setDescreption(event.target.value)}
					/>
					<label>Kategorie</label>
					<select
						value={category}
						onChange={(event) => setCategory(event.target.value)}
					>
						{categories?.length > 0 &&
							categories.map((categoryFromMap) => (
								<option key={categoryFromMap._id} value={categoryFromMap._id}>
									{categoryFromMap.name}
								</option>
							))}
					</select>
					<label>Basis Preis</label>
					<input
						type="text"
						value={basePrice}
						onChange={(event) => setBasePrice(event.target.value)}
					/>
					<MenuItemPriceProps
						name={"Sizes"}
						addLabel={"Füge Item Größe hinzu"}
						props={sizes}
						setProps={setSizes}
					/>
					<MenuItemPriceProps
						name={"Extra ingredients"}
						addLabel={"Füge Zutaten hinzu"}
						props={extraIngredientPrices}
						setProps={setExtraIngredientPrices}
					/>
					<button type="submit" className="mb-2">
						Save
					</button>
				</div>
			</div>
		</form>
	);
}

export default MenuItemForm;
