"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function UserTabs({ isAdmin }) {
	const path = usePathname();
	return (
		<div className="flex justify-center gap-2 tabs">
			<Link href={"/profile"} className={"active"}>
				Profile
			</Link>
			{isAdmin && (
				<>
					<Link href={"/categories"}>Kategorien</Link>
					<Link href={"/menu-items"}>Rezepte</Link>
					<Link href={"/users"}>Users</Link>
				</>
			)}
		</div>
	);
}

export default UserTabs;
