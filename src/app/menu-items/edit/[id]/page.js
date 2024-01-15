"use client";

import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/useProfile";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import MenuItemForm from "@/components/layout/MenuItemForm";

function EditMenuItemPage() {
	const { id } = useParams();
	const { loading, data } = useProfile();

	const [menuItem, setMenuItem] = useState(null);
	const [redirectToItems, setRedirectToItems] = useState(false);

	useEffect(() => {
		fetch("/api/menu-items").then((res) => {
			res.json().then((items) => {
				const item = items.find((i) => i._id === id);
				setMenuItem(item);
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
			<MenuItemForm menuItem={menuItem} />
		</section>
	);
}

export default EditMenuItemPage;
