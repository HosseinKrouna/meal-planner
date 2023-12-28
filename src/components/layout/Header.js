import Link from "next/link";

function Header() {
	return (
		<header className="flex items-center justify-between p-4 md:p-8">
			<Link href={""} className="text-primary font-semibold text-2xl">
				MEAL-PLANNER
			</Link>
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
