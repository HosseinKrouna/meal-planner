"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

function ProfilePage() {
	const session = useSession();
	console.log(session);
	const [userName, setUserName] = useState(session?.data?.user?.name || "");
	const { status } = session;

	const [saved, setSaved] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const [image, setImage] = useState("");

	useEffect(() => {
		if (status === "authenticated") {
			setUserName(session.data.user.name);
			setImage(session.data.user.image);
		}
	}, [session, status]);

	async function handleProfileInfoUpdate(event) {
		event.preventDefault();
		setSaved(false);
		setIsSaving(true);
		const response = await fetch("/api/profile", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: userName, image }),
		});
		setIsSaving(false);
		if (response.ok) {
			setSaved(true);
		}
	}

	async function handleFileChange(event) {
		const files = event.target.files;
		if (files?.length === 1) {
			const data = new FormData();
			data.append("file", files[0]);

			try {
				const response = await fetch("/api/upload", {
					method: "POST",
					body: data,
				});

				const link = await response.json();
				setImage(link);

				if (response.ok) {
					return response;
				}
			} catch (error) {
				throw new Error("Something went wrong");
			}
		}
	}

	if (status === "loading") {
		return "Loading...";
	}

	if (status === "unauthenticated") {
		return redirect("/login");
	}

	return (
		<section className="mt-8">
			<h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
			<div className="max-w-md mx-auto">
				{saved && (
					<h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
						Profile aktualisiert!
					</h2>
				)}
				{isSaving && (
					<h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
						...wird aktualisiert!
					</h2>
				)}

				<div className="flex gap-4 items-center">
					<div>
						<div className="p-2 rounded-lg relative max-w-[120px]">
							{image && (
								<Image
									className="rounded-lg w-full h-full mb-1"
									src={image}
									alt="Profile Avatar"
									width={73}
									height={73}
									layout=""
								/>
							)}

							<label>
								<input
									type="file"
									className="hidden"
									onChange={handleFileChange}
								/>
								<span className="block border-gray-300 border rounded-lg p-2 text-center cursor-pointer">
									Edit
								</span>
							</label>
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
