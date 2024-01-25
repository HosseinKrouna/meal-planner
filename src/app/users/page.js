"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
	const [users, setUsers] = useState([]);
	const { loading, data: loggedInUserData } = useProfile();

	useEffect(() => {
		fetch("/api/users").then((response) => {
			response.json().then((users) => {
				setUsers(users);
			});
		});
	}, []);

	console.log(users);

	if (loading) {
		return "Loading user info...";
	}

	if (!loggedInUserData.admin) {
		return "Not an admin";
	}

	return (
		<section className="max-w-2xl mx-auto mt-8">
			<UserTabs isAdmin={true} />
			<div className="mt-8">
				{users?.length > 0 &&
					users.map((user) => (
						<div
							key={user._id}
							className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
						>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
								<div className="text-gray-900">
									{!!user.name && <span>{user.name}</span>}
									{!user.name && <span className="italic">No name</span>}
								</div>
								<span className="text-gray-500 overflow-hidden overflow-ellipsis max-w-xs md:max-w-none">
									{user.email}
								</span>
							</div>
							<div>
								<Link href={`/users/${user._id}`} as={`/users/${user._id}`}>
									<button className="button">...mehr</button>
								</Link>
							</div>
						</div>
					))}
			</div>
		</section>
	);
}
