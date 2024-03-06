"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";

export default function MenuPage() {
	const [categories, setCategories] = useState([]);
	const [menuItems, setMenuItems] = useState([]);
	const [openCategories, setOpenCategories] = useState({}); // Zustand für geöffnete Kategorien

	useEffect(() => {
		fetch("/api/categories").then((res) => {
			res.json().then((categories) => setCategories(categories));
		});
		fetch("/api/menu-items").then((res) => {
			res.json().then((menuItems) => setMenuItems(menuItems));
		});
	}, []);

	const toggleCategory = (categoryId) => {
		setOpenCategories((prevOpenCategories) => ({
			...prevOpenCategories,
			[categoryId]: !prevOpenCategories[categoryId],
		}));
	};

	return (
		<section className="mt-8">
			{categories?.length > 0 &&
				categories.map((c) => (
					<div key={c._id}>
						<div className="text-center border rounded-md p-2 mb-2 bg-gray-200 border-gray-300 shadow-md">
							<div
								className="flex items-center justify-between cursor-pointer"
								onClick={() => toggleCategory(c._id)}
							>
								<SectionHeaders mainHeader={c.name} />
								{openCategories[c._id] ? <ChevronUp /> : <ChevronDown />}
							</div>
						</div>
						{openCategories[c._id] && (
							<div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
								{menuItems
									.filter((item) => item.category === c._id)
									.map((item) => (
										<div key={item._id} className="recipe-card-container">
											<MenuItem {...item} />
										</div>
									))}
							</div>
						)}
					</div>
				))}
		</section>
	);
}
