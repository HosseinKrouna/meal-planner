"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function HomeMenu() {
	const [latestRecipes, setLatestRecipes] = useState([]);
	useEffect(() => {
		fetch("/api/menu-items").then((res) => {
			res.json().then((menuItems) => {
				setLatestRecipes(menuItems.slice(-3));
			});
		});
	}, []);
	return (
		<section className="">
			<div className="absolute left-0 right-0 w-full justify-start">
				<div className="absolute left-0 -top-[70px] text-left -z-10">
					{/* <Image src={"/sallad1.png"} width={109} height={189} alt={"sallad"} /> */}
				</div>
				<div className="absolute -top-[100px] right-0 -z-10">
					{/* <Image src={"/sallad2.png"} width={107} height={195} alt={"sallad"} /> */}
				</div>
			</div>
			<div className="text-center mb-4">
				<SectionHeaders
					subHeader={"Check doch mal die"}
					mainHeader={"Neusten Rezepte"}
				/>
			</div>
			<div className="grid sm:grid-cols-3 gap-4">
				{latestRecipes?.length > 0 &&
					latestRecipes.map((item) => <MenuItem key={item._id} {...item} />)}
			</div>
		</section>
	);
}
