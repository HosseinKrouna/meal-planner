"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

function ProfilePage() {
	const session = useSession();
	const [userName, setUserName] = useState(session?.data?.user?.name || "");
	const { status } = session;

	async function handleProfileInfoUpdate(event) {
		event.preventDefault();
		const response = await fetch("/api/profile", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: userName }),
		});
	}

	if (status === "loading") {
		return "Loading...";
	}

	if (status === "unauthenticated") {
		return redirect("/login");
	}

	const userImage = session.data.user.image;

	return (
		<section className="mt-8">
			<h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
			<div className="max-w-md mx-auto">
				<div className="flex gap-4 items-center">
					<div>
						<div className="p-2 rounded-lg relative">
							<Image
								className="rounded-lg w-full h-full mb-1"
								src={userImage}
								alt="Profile Avatar"
								width={73}
								height={73}
								layout=""
							/>
							<button type="button">Edit</button>
						</div>
					</div>
					<form
						className="grow max-w-md mx-auto"
						onSubmit={handleProfileInfoUpdate}
					>
						<input
							value={userName}
							onChange={(event) => setUserName(event.target.value)}
							type="text"
							placeholder="Vor- und Nachname"
						/>
						<input
							type="email"
							value={session.data.user.email}
							disabled={true}
						/>
						<button type="submit">Save</button>
					</form>
				</div>
			</div>
		</section>
	);
}

export default ProfilePage;
