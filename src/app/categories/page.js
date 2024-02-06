"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "../../components/UseProfile";

function CategoriesPage() {
	const [editedCategory, setEditedCategory] = useState(null);
	const [categories, setCategories] = useState([]);
	const [categoryName, setCategoryName] = useState("");
	const { loading: profileLoading, data: profileData } = useProfile();

	useEffect(() => {
		fetchCategories();
	}, []);

	function fetchCategories() {
		fetch("/api/categories").then((res) => {
			res.json().then((categories) => {
				setCategories(categories);
			});
		});
	}
	async function handleCategorySubmit(event) {
		event.preventDefault();
		const data = { name: categoryName };
		if (editedCategory) {
			data._id = editedCategory._id;
		}

		const creationPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/categories", {
				method: editedCategory ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			setCategoryName("");
			fetchCategories();
			setEditedCategory(null);

			if (response.ok) {
				resolve();
			} else {
				reject();
			}
		});

		await toast.promise(creationPromise, {
			loading: editedCategory
				? "Updating category..."
				: "Creating your new category...",
			success: editedCategory ? "Category updated" : "Category created",
			error: "Error, sorry...",
		});
	}

	if (profileLoading) {
		return "Loading user info...";
	}

	if (!profileData.admin) {
		return "Kein Admin";
	}

	async function handleDeleteClick(_id) {
		const promise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/categories?_id=" + _id, {
				method: "DELETE",
			});
			if (response.ok) {
				resolve();
			} else {
				reject();
			}
		});
		await toast.promise(promise, {
			loading: "Deleting...",
			success: "Deleted",
			error: "Error",
		});
		fetchCategories();
	}

	return (
		<section className="mt-8 max-w-md mx-auto">
			<UserTabs isAdmin={true} />
			<form className="mt-8" onSubmit={handleCategorySubmit}>
				<div className="flex flex-col gap-2 items-end">
					<div className="w-full">
						<label>
							{editedCategory
								? "Kategorie aktualisieren"
								: "Neuer Kategoriename"}
							{editedCategory && (
								<>
									: <b>{editedCategory.name}</b>
								</>
							)}
						</label>
						<input
							type="text"
							value={categoryName}
							onChange={(event) => setCategoryName(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<button type="submit" className="border border-primary">
							{editedCategory ? "Aktualisieren" : "Erstellen"}
						</button>
					</div>
				</div>
			</form>
			<div>
				<h2 className="text-sm mt-8 text-gray-500">Vorhandene Kategorie:</h2>
				{categories?.length > 0 &&
					categories.map((category) => (
						<div
							key={category._id}
							className="bg-gray-100 rounded-xl p-2 px-4 flex flex-col md:flex-row gap-1 mb-1 items-center"
						>
							<div className="grow md:w-1/2">{category.name}</div>{" "}
							{/* Anpassung der Breite auf größeren Bildschirmen */}
							<div className="flex gap-1">
								<button
									type="button"
									onClick={() => {
										setEditedCategory(category);
										setCategoryName(category.name);
									}}
								>
									Bearbeiten
								</button>
								<button
									type="button"
									className="text-red-600 hover:text-red-800 focus:outline-none"
									onClick={() => handleDeleteClick(category._id)}
								>
									LÖSCHEN
								</button>
							</div>
						</div>
					))}
			</div>
		</section>
	);
}

export default CategoriesPage;
