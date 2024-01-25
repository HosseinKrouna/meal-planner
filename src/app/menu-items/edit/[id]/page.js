"use client";

import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import UserTabs from "@/components/layout/UserTabs";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/layout/DeleteButton";
import { useProfile } from "../../../../components/UseProfile";

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

	async function handleFormSubmit(event, data) {
		event.preventDefault();
		console.log(data);
		data = { ...data, _id: id };
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

	async function handleDeleteClick() {
		const promise = new Promise(async (resolve, reject) => {
			const res = await fetch("/api/menu-items?_id=" + id, {
				method: "DELETE",
			});
			if (res.ok) resolve();
			else reject();
		});

		await toast.promise(promise, {
			loading: "Deleting...",
			success: "Deleted",
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
			<MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
			<div className="max-w-md mx-auto mt-2 flex justify-center">
				<div className="max-w-xs">
					<DeleteButton
						label="Dieses Rezept Löschen"
						onDelete={handleDeleteClick}
					/>
				</div>
			</div>
		</section>
	);
}

export default EditMenuItemPage;
