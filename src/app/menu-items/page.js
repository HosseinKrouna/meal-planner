"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Right from "@/components/icons/Right";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

function MenuItemsPage() {
	const { loading, data } = useProfile();

	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		fetch("/api/menu-items").then((res) => {
			res.json().then((menuItems) => {
				setMenuItems(menuItems);
			});
		});
	}, []);

	if (loading) {
		return "Loading user info...";
	}

	if (!data.admin) {
		return "Kein Admin.";
	}
	return (
		<section className="mt-8">
			<UserTabs isAdmin={true} />
			<div className="max-w-2xl mx-auto mt-8">
				<Link href={"/menu-items/new"} className="button">
					<Right />
					<span>Neues Rezept erstellen</span>
				</Link>
			</div>
			<div>
				<h2 className="text-sm text-gray-500 mt-8">Rezepte Sammlung:</h2>

				<div className="grid grid-cols-3 gap-2">
					{menuItems?.length > 0 &&
						menuItems.map((item) => (
							<Link
								key={item._id}
								href={"/menu-items/edit/" + item._id}
								className="bg-gray-200 rounded-lg p-4 flex flex-col items-center"
								style={{ maxWidth: "200px", padding: "10px" }}
							>
								<div className="relative mb-2">
									<Image
										className="rounded-md"
										src={item.image}
										alt={""}
										width={200}
										height={200}
									/>
								</div>
								<div
									style={{ fontSize: 11 }}
									className="text-center font-bold mt-2 mx-4"
								>
									{item.name}
								</div>
							</Link>
						))}
				</div>
			</div>
		</section>
	);
}

export default MenuItemsPage;
