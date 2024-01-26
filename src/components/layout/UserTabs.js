"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function UserTabs({ isAdmin }) {
	const path = usePathname();
	return (
		<div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
			<Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
				Profile
			</Link>
			{isAdmin && (
				<>
					<Link
						href={"/categories"}
						className={path === "/categories" ? "active" : ""}
					>
						Kategorien
					</Link>
					<Link
						href={"/menu-items"}
						className={path.includes("menu-items") ? "active" : ""}
					>
						Rezepte
					</Link>
					<Link
						className={path.includes("/users") ? "active" : ""}
						href={"/users"}
					>
						Benutzer
					</Link>
				</>
			)}
			<Link
				className={path.includes("/recipe-book") ? "active" : ""}
				href={"/recipe-book"}
			>
				Rezeptbuch
			</Link>
		</div>
	);
}

export default UserTabs;
