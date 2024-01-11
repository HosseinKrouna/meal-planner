"use client";

import Link from "next/link";
import { useState } from "react";
import Menu from "../icons/Menu";
import { signOut, useSession } from "next-auth/react";

function Header() {
	const session = useSession();
	const status = session?.status;

	const userData = session.data?.user;
	let userName = userData?.name || userData?.email;
	if (userName && userName.includes(" ")) {
		userName = userName.split(" ")[0];
	}

	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<header className="flex items-center justify-between p-4 md:p-8">
			<div className="flex items-center">
				<Link href={"/"} className="text-primary font-semibold text-2xl">
					MEAL-PLANNER
				</Link>
			</div>

			{/*Mobile Navigation*/}
			{showMenu && (
				<div className="fixed top-16 right-4 z-50 bg-white rounded shadow-xl p-4">
					<Link
						href={"/"}
						className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						Home
					</Link>
					<Link
						href={""}
						className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						Menü
					</Link>
					<Link
						href={""}
						className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						About
					</Link>
					<Link
						href={""}
						className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						Contact
					</Link>
				</div>
			)}

			{/* Desktop Navigation */}
			<nav className="hidden md:flex items-center gap-6 text-gray-500 font-semibold">
				<Link href={""}>Home</Link>
				<Link href={""}>Menü</Link>
				<Link href={""}>About</Link>
				<Link href={""}>Contact</Link>
			</nav>

			<nav className="flex items-center gap-4 text-gray-500 font-semibold">
				{status === "unauthenticated" && (
					<>
						<Link href={"/login"}>Login</Link>
						<Link
							href={"/register"}
							className="bg-primary text-white rounded-full px-4 py-2"
						>
							Register
						</Link>
					</>
				)}

				{status === "authenticated" && (
					<>
						<Link href={"/profile"} className="whitespace-nowrap">
							Hallo, {userName}
						</Link>
						<button
							onClick={() => signOut()}
							className="bg-primary text-white rounded-full px-8 py-2"
						>
							Logout
						</button>
					</>
				)}
			</nav>
			<div className="items-center md:hidden">
				<button onClick={toggleMenu} className="focus:outline-none">
					<Menu />
				</button>
			</div>
		</header>
	);
}

export default Header;
