"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";

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
	const [isAdmin, setIsAdmin] = useState(false);
	const [image, setImage] = useState("");
	const [profileFeched, setProfileFeched] = useState(false);

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
					setIsAdmin(data.admin);
					setProfileFeched(true);
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

	if (status === "loading" || !profileFeched) {
		return "Loading...";
	}

	if (status === "unauthenticated") {
		return redirect("/login");
	}

	return (
		<section className="mt-8">
			<UserTabs isAdmin={isAdmin} />
			<div className="max-w-md mx-auto mt-8">
				<div className="flex gap-4">
					<div>
						<div className="p-2 rounded-lg relative max-w-[120px]">
							<EditableImage link={image} setLink={setImage} />
						</div>
					</div>
					<form className="grow" onSubmit={handleProfileInfoUpdate}>
						<label>Benutzername</label>
						<input
							style={{ marginTop: "0" }}
							value={userName}
							onChange={(event) => setUserName(event.target.value)}
							type="text"
							placeholder="Vor- und Nachname"
						/>
						<label>Email</label>
						<input
							style={{ marginTop: "0" }}
							type="email"
							value={session.data.user.email}
							disabled={true}
						/>
						<label>Telefonnummer</label>

						<input
							style={{ marginTop: "0" }}
							type="tel"
							value={phonenummber}
							onChange={(event) => setPhonenumber(event.target.value)}
							placeholder="Telefonnummer"
						/>

						<label>Straße und Hausnummer</label>

						<input
							style={{ marginTop: "0" }}
							type="text"
							value={streetAddress}
							onChange={(event) => setStreetAddress(event.target.value)}
							placeholder="Straße + Hausnummer"
						/>
						<div className="flex gap-2">
							<div>
								<label>Postleitzahl</label>
								<input
									style={{ marginTop: "0" }}
									type="text"
									value={postalCode}
									onChange={(event) => setPostalCode(event.target.value)}
									placeholder="Postleitzahl"
								/>
							</div>
							<div>
								<label>Stadt</label>
								<input
									style={{ marginTop: "0" }}
									type="text"
									value={city}
									onChange={(event) => setCity(event.target.value)}
									placeholder="Stadt"
								/>
							</div>
						</div>

						<label>Land</label>

						<input
							style={{ marginTop: "0" }}
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
