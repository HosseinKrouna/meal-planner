"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";

function CategoriesPage() {
	const { loading: profileLoading, data: profileData } = useProfile();

	if (profileLoading) {
		return "Loading user info...";
	}

	if (!profileData) {
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
