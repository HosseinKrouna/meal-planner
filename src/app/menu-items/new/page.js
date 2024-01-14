"use client";

import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";

function NewMenuItemPage() {
	const { loading, data } = useProfile();

	// async function handleFormSubmit(ev, data) {
	// 	ev.preventDefault();
	// 	const savingPromise = new Promise(async (resolve, reject) => {
	// 		const response = await fetch("/api/menu-items", {
	// 			method: "POST",
	// 			body: JSON.stringify(data),
	// 			headers: { "Content-Type": "application/json" },
	// 		});
	// 		if (response.ok) resolve();
	// 		else reject();
	// 	});

	// 	await toast.promise(savingPromise, {
	// 		loading: "Saving this tasty item",
	// 		success: "Saved",
	// 		error: "Error",
	// 	});
	// }

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
					<span>Show all menu items</span>
				</Link>
			</div>
		</section>
	);
}

export default NewMenuItemPage;
