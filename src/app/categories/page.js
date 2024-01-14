"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

	return (
		<section className="mt-8 max-w-md mx-auto">
			<UserTabs isAdmin={true} />
			<form className="mt-8" onSubmit={handleCategorySubmit}>
				<div className="flex gap-2 items-end">
					<div className="grow">
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
				<h2 className="text-sm mt-8 text-gray-500">Kategorie bearbeiten:</h2>
				{categories?.length > 0 &&
					categories.map((category) => (
						<button
							key={category.id}
							onClick={() => {
								setEditedCategory(category);
								setCategoryName(category.name);
							}}
							className=" bg-gray-200 rounded-xl p-2 px -4 flex gap-1 cursor-pointer mb-1"
						>
							<span key={category.id}>{category.name}</span>
						</button>
					))}
			</div>
		</section>
	);
}

export default CategoriesPage;
