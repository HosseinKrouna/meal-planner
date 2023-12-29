"use client";
import Image from "next/image";
import { useState } from "react";

function ReigisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	function handleFormSubmit(event) {
		event.preventDefault();
		if (password.length < 5) {
			setError("Das Passwort muss mindestens 5 Zeichen lang sein");
		} else {
			fetch("/api/register", {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "application/json" },
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					console.log("Registration successful!", data);
				})
				.catch((error) => {
					console.error("There was an error registering:", error);
				});
			setError("");
		}
	}

	return (
		<section className="mt-10">
			<h1 className="text-center mb-4 text-primary text-4xl">Register</h1>
			{error && <div className="text-red-500">{error}</div>}
			<form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<input
					type="email"
					placeholder="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<button type="submit">Register</button>
				<div className="my-4 text-center text-gray-600">
					oder Log dich mit einem Provider an
				</div>
				<button className="flex gap-4 justify-center">
					<Image
						src={"/google-logo.png"}
						width={25}
						height={25}
						alt="Google logo"
					/>
					Login mit Google
				</button>
			</form>
		</section>
	);
}

export default ReigisterPage;
