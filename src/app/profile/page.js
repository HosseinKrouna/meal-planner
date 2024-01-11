"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import toast from "react-hot-toast";

function ProfilePage() {
	const session = useSession();
	const { status } = session;
	console.log({ session });
	const [userName, setUserName] = useState(session?.data?.user?.name || "");
	const [phonenummber, setPhonenumber] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");

	const [image, setImage] = useState("");

	useEffect(() => {
		if (status === "authenticated") {
			setUserName(session.data.user.name);
			setImage(session.data.user.image);
			fetch("/api/profile").then((response) => {
				response.json().then((data) => {
					setPhonenumber(data.phonenummber);
					setStreetAddress(data.streetAddress);
					setPostalCode(data.postalCode);
					setCountry(data.country);
					setCity(data.city);
				});
			});
		}
	}, [session, status]);

	async function handleProfileInfoUpdate(event) {
		event.preventDefault();
		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/profile", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: userName,
					image,
					phonenummber,
					streetAddress,
					postalCode,
					city,
					country,
				}),
			});
			if (response.ok) resolve();
			else reject();
		});

		await toast.promise(savingPromise, {
			loading: "Saving...",
			success: "Profile saved!",
			error: "Error",
		});
	}

	async function handleFileChange(event) {
		const files = event.target.files;
		if (files?.length === 1) {
			const data = new FormData();
			data.append("file", files[0]);

			const uploadPromise = new Promise(async (resolve, reject) => {
				const response = await fetch("/api/upload", {
					method: "POST",
					body: data,
				});
				if (response.ok) {
					const link = await response.json();
					setImage(link);
					resolve();
				} else {
					reject();
				}
			});

			await toast.promise(uploadPromise, {
				loading: "Uploading...",
				success: "Upload erfolgreich!",
				error: "Upload error!",
			});
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
				<div className="flex gap-4">
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
					<form className="grow" onSubmit={handleProfileInfoUpdate}>
						<label>Benutzername</label>
						<input
							style={{ "margin-top": "0" }}
							value={userName}
							onChange={(event) => setUserName(event.target.value)}
							type="text"
							placeholder="Vor- und Nachname"
						/>
						<label>Email</label>
						<input
							style={{ "margin-top": "0" }}
							type="email"
							value={session.data.user.email}
							disabled={true}
						/>
						<label>Telefonnummer</label>

						<input
							style={{ "margin-top": "0" }}
							type="tel"
							value={phonenummber}
							onChange={(event) => setPhonenumber(event.target.value)}
							placeholder="Telefonnummer"
						/>

						<label>Straße und Hausnummer</label>

						<input
							style={{ "margin-top": "0" }}
							type="text"
							value={streetAddress}
							onChange={(event) => setStreetAddress(event.target.value)}
							placeholder="Straße + Hausnummer"
						/>
						<div className="flex gap-2">
							<div>
								<label>Postleitzahl</label>
								<input
									style={{ "margin-top": "0" }}
									type="text"
									value={postalCode}
									onChange={(event) => setPostalCode(event.target.value)}
									placeholder="Postleitzahl"
								/>
							</div>
							<div>
								<label>Stadt</label>
								<input
									style={{ "margin-top": "0" }}
									type="text"
									value={city}
									onChange={(event) => setCity(event.target.value)}
									placeholder="Stadt"
								/>
							</div>
						</div>

						<label>Land</label>

						<input
							style={{ "margin-top": "0" }}
							type="text"
							value={country}
							onChange={(event) => setCountry(event.target.value)}
							placeholder="Land"
						/>

						<button type="submit">Save</button>
					</form>
				</div>
			</div>
		</section>
	);
}

export default ProfilePage;
