import Link from "next/link";

function UserTabs({ isAdmin }) {
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
