"use client";

import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import MenuItemForm from "../../../components/layout/MenuItemForm";

function NewMenuItemPage() {
	const { loading, data } = useProfile();
	const [redirectToItems, setRedirectToItems] = useState(false);

	async function handleFormSubmit(event, data) {
		event.preventDefault();
		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/menu-items", {
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
			<MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
		</section>
	);
}

export default NewMenuItemPage;
