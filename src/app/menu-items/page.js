"use client";

import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

function MenuItemsPage() {
	const [redirectToItems, setRedirectToItems] = useState(false);

	const [image, setImage] = useState("");
	const [description, setDescreption] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [name, setName] = useState("");

	const { loading, data } = useProfile();

	async function handleFormSubmit(event) {
		event.preventDefault();
		const data = { image, description, ingredients, name };
		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("api/menu-items", {
				method: "POST",
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" },
			});
			if (response.ok) {
				resolve();
			} else {
				reject();
			}
		});

		await toast.promise(savingPromise, {
			loading: "Das Rezept wird gespeichert",
			success: "Gespeichert",
			error: "Error",
		});

		setRedirectToItems(true);
	}

	if (redirectToItems) {
		return redirect("/menu-items");
	}

	if (loading) {
		return "Loading user info...";
	}

	if (!data.admin) {
		return "Kein Admin.";
	}
	return (
		<section className="mt-8">
			<UserTabs isAdmin={true} />
			<form onSubmit={handleFormSubmit} className=" max-w-2xl mx-auto mt-8">
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
		</section>
	);
}

export default MenuItemsPage;
