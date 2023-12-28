import Link from "next/link";
import { useState } from "react";
import Menu from "../icons/Menu";

function Header() {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<header className="flex items-center justify-between p-4 md:p-8">
			<div className="flex items-center">
				<Link href={""} className="text-primary font-semibold text-2xl">
					MEAL-PLANNER
				</Link>
			</div>

			<div className="flex items-center ml-4">
				<Link
					href={""}
					className="bg-primary text-white rounded-full px-4 py-2 md:hidden"
				>
					Login
				</Link>
			</div>

			<div className="items-center md:hidden">
				<button onClick={toggleMenu} className="focus:outline-none">
					<Menu />
				</button>
			</div>

			{/*Mobile Navigation*/}
			{showMenu && (
				<div className="fixed top-16 right-4 z-50 bg-white rounded shadow-xl p-4">
					<Link
						href={""}
						className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						Home
					</Link>
					<Link
						href={""}
						className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						Menu
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
				<Link href={""}>Menu</Link>
				<Link href={""}>About</Link>
				<Link href={""}>Contact</Link>
				<Link
					href={""}
					className="bg-primary text-white rounded-full px-4 py-2"
				>
					Login
				</Link>
			</nav>
		</header>
	);
}

export default Header;
