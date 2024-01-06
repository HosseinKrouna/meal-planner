"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function ReigisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fewCharactersMessage, setFewCharactersMessage] = useState("");
	const [creatingUser, setCreatingUser] = useState(false);
	const [userCreated, setUserCreated] = useState(false);
	const [error, setError] = useState(false);

	async function handleFormSubmit(event) {
		event.preventDefault();

		setCreatingUser(true);
		setError(false);
		setUserCreated(false);

		if (password.length < 5) {
			setFewCharactersMessage(
				"Das Passwort muss mindestens 5 Zeichen lang sein"
			);
		} else {
			const response = await fetch("/api/register", {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				setUserCreated(true);
			} else {
				setError(true);
			}

			setCreatingUser(false);
		}
	}

	return (
		<section className="mt-10">
			<h1 className="text-center mb-4 text-primary text-4xl">Register</h1>
			{userCreated && (
				<div className="my-4 text-center">
					User erstellt.
					<br />
					Du kannst dich gleich einloggen{" "}
					<Link className="underline" href={"/login"}>
						Login
					</Link>
				</div>
			)}
			{error && (
				<div className="my-4 text-center">
					Ein Fehler ist aufgetreten. Versuche es später noch einmal.
				</div>
			)}
			{fewCharactersMessage && (
				<div className="text-red-500">{fewCharactersMessage}</div>
			)}
			<form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<input
					type="email"
					placeholder="email"
					value={email}
					disabled={creatingUser}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					disabled={creatingUser}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<button type="submit" disabled={creatingUser}>
					Register
				</button>
				<div className="my-4 text-center text-gray-600">
					oder Log dich mit einem Provider an
				</div>
				<button
					onClick={() => signIn("google", { callbackUrl: "/" })}
					className="flex gap-4 justify-center"
				>
					<Image
						src={"/google-logo.png"}
						width={25}
						height={25}
						alt="Google logo"
					/>
					Login mit Google
				</button>
				<div>
					Du hast schin ein Konto?{" "}
					<Link className="underline" href={"/login"}>
						Login hier &raquo;
					</Link>
				</div>
			</form>
		</section>
	);
}

export default ReigisterPage;
