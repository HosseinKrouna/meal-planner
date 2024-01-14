"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";

function CategoriesPage() {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		fetch("/ap/profile").then((response) => {
			response.json().then((data) => {
				setIsAdmin(data.admin);
			});
		});
	}, []);

	if (!isAdmin) {
		return "Kein Admin";
	}

	return (
		<section className="mx-auto mt-8 mx-w-lg">
			<UserTabs isAdmin={true} />
			CategoriesPage
		</section>
	);
}

export default CategoriesPage;
