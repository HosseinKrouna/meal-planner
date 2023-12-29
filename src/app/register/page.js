"use client";
import Image from "next/image";
import { useState } from "react";

function ReigisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleFormSubmit() {}

	return (
		<section className="mt-10">
			<h1 className="text-center mb-4 text-primary text-4xl">Register</h1>
			<form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<input
					type="email"
					placeholder="email"
					value={email}
					onChange={(ev) => setEmail(ev.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(ev) => setPassword(ev.target.value)}
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