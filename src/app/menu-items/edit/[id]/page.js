"use client";

import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/useProfile";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";

function EditMenuItemPage() {
	const { id } = useParams();
	const { loading, data } = useProfile();

	const [redirectToItems, setRedirectToItems] = useState(false);

	const [image, setImage] = useState("");
	const [description, setDescreption] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		fetch("/api/menu-items").then((res) => {
			res.json().then((items) => {
				const item = items.find((i) => i._id === id);
				setImage(item.image);
				setDescreption(item.description);
				setIngredients(item.ingredients);
				setName(item.name);
			});
		});
	}, [id]);

	async function handleFormSubmit(event) {
		event.preventDefault();
		const data = { image, description, ingredients, name, _id: id };
		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/menu-items", {
				method: "PUT",
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
		return "Not an admin.";
	}

	return (
		<section className="mt-8">
			<UserTabs isAdmin={true} />
			<div className="max-w-2xl mx-auto mt-8">
				<Link href={"/menu-items"} className="button">
					<Right />
					<span>Alle Rezepte anzeigen</span>
				</Link>
			</div>
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

export default EditMenuItemPage;
