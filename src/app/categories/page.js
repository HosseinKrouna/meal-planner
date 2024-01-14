"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { useState } from "react";
import toast from "react-hot-toast";

function CategoriesPage() {
	const [newCategoryName, setNewCategoryName] = useState("");
	const { loading: profileLoading, data: profileData } = useProfile();

	async function handleNewCategorySubmit(event) {
		event.preventDefault();

		const creationPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/categories", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newCategoryName }),
			});
			if (response.ok) {
				resolve();
			} else {
				reject();
			}
		});

		await toast.promise(creationPromise, {
			loading: "Creating your new category...",
			success: "Category created",
			error: "Error, sorry...",
		});
	}

	if (profileLoading) {
		return "Loading user info...";
	}

	if (!profileData.admin) {
		return "Kein Admin";
	}

	return (
		<section className="mt-8 max-w-md mx-auto">
			<UserTabs isAdmin={true} />
			<form className="mt-8" onSubmit={handleNewCategorySubmit}>
				<div className="flex gap-2 items-end">
					<div className="grow">
						<label>Neue Kategorie</label>
						<input
							type="text"
							value={newCategoryName}
							onChange={(event) => setNewCategoryName(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<button type="submit" className="border border-primary">
							Erstellen
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}

export default CategoriesPage;
