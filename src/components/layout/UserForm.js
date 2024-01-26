"use client";
import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import { useProfile } from "../../components/useProfile";

export default function UserForm({ user, onSave, readOnly }) {
	const [userName, setUserName] = useState(user?.name || "");
	const [image, setImage] = useState(user?.image || "");
	const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
	const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
	const [postalCode, setPostalCode] = useState(user?.postalCode || "");
	const [city, setCity] = useState(user?.city || "");
	const [country, setCountry] = useState(user?.country || "");
	const [admin, setAdmin] = useState(user?.admin || false);

	const { data: loggedInUserData, loading } = useProfile();
	console.log("loggedInUserData: ", loggedInUserData);
	// useEffect(() => {
	// 	if (user) {
	// 		setUserName(user.name || "");
	// 		// Setzen Sie hier andere Zustände basierend auf `user`
	// 	}
	// }, [user]);
	console.log(user);
	if (loading) {
		return "Loading user profile...";
	}

	if (!loggedInUserData.admin) {
		return "Not an admin";
	}

	function handleAddressChange(propName, value) {
		if (propName === "phoneNumber") setPhoneNumber(value);
		if (propName === "streetAddress") setStreetAddress(value);
		if (propName === "postalCode") setPostalCode(value);
		if (propName === "city") setCity(value);
		if (propName === "country") setCountry(value);
	}

	return (
		<div className="md:flex gap-4">
			<div>
				<div className="p-2 rounded-lg relative max-w-[120px]">
					<EditableImage link={image} setLink={setImage} readOnly={readOnly} />
				</div>
			</div>
			<form
				className="grow"
				onSubmit={(ev) =>
					onSave(ev, {
						name: userName,
						image,
						phoneNumber,
						admin,
						streetAddress,
						city,
						country,
						postalCode,
					})
				}
			>
				<label>First and last name</label>
				<input
					type="text"
					placeholder="First and last name"
					value={userName}
					onChange={(ev) => setUserName(ev.target.value)}
				/>
				<label>Email</label>
				<input
					type="email"
					disabled={true}
					value={user.email}
					placeholder={"email"}
				/>
				<AddressInputs
					addressProps={{
						phoneNumber,
						streetAddress,
						postalCode,
						city,
						country,
					}}
					setAddressProp={handleAddressChange}
				/>
				{loggedInUserData.admin && (
					<div>
						<label
							className="p-2 inline-flex items-center gap-2 mb-2"
							htmlFor="adminCb"
						>
							<input
								id="adminCb"
								type="checkbox"
								className=""
								value={"1"}
								checked={admin}
								onChange={(ev) => setAdmin(ev.target.checked)}
							/>
							<span>Admin</span>
						</label>
					</div>
				)}
				<button type="submit">Save</button>
				{/* {data.admin && <button type="submit">Save</button>}
				{!data.admin && (
					<button type="submit" readOnly={disabled}>
						Save
					</button>
				)} */}
			</form>
		</div>
	);
}
