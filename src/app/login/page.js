"use client";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginInProgress, setLoginInProgress] = useState(false);

	async function handleFormSubmit(event) {
		event.preventDefault();
		setLoginInProgress(true);
		await signIn("credentials", { email, password });
		setLoginInProgress(false);
	}

	return (
		<section>
			<h1 className="text-primary text-center text-4xl mb-4">Login</h1>
			<form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<input
					type="email"
					name="email"
					placeholder="email"
					value={email}
					disabled={loginInProgress}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input
					name="password"
					type="password"
					placeholder="password"
					value={password}
					disabled={loginInProgress}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<button disabled={loginInProgress} type="submit">
					Login
				</button>
				<div className="my-4 text-center text-gray-500">
					oder ogin mit Google
				</div>
				<button
					type="button"
					onClick={() => signIn("google", { callbackUrl: "/" })}
					className="flex gap-4 justify-center"
				>
					<Image
						src={"/google-logo.png"}
						alt="Google Logo"
						width={24}
						height={24}
					/>
					Login mit Google
				</button>
			</form>
		</section>
	);
}

export default LoginPage;
