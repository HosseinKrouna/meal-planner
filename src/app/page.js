"use client";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
	return (
		<>
			<Hero />
			<HomeMenu />
			<section className="text-center my-16">
				<SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
			</section>
			<div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
				<p>
					Stell dir vor, eine Gruppe von Ernährungsexperten, Köchen und
					Gesundheitsfreaks hat ihre Köpfe zusammengesteckt, um eine App zu
					entwickeln, die dir nicht nur gesunde Speisepläne bietet, sondern auch
					eine Community, die dich motiviert und inspiriert, deine Ernährung zu
					verbessern. Diese App bietet maßgeschneiderte Pläne, Rezepte und Tipps
					für ein gesünderes, energiegeladenes Leben – alles in einem Ort, den
					du in deiner Tasche tragen kannst.
				</p>
				<p>
					In unserer App geht es nicht nur um gesunde Mahlzeiten, sondern auch
					darum, wie du dich dabei fühlst. Wir glauben an einen ganzheitlichen
					Ansatz für deine Ernährung. Unsere Community teilt nicht nur Rezepte,
					sondern auch Erfahrungen, Tipps und Motivation, um dich auf dem Weg zu
					einem gesünderen Lebensstil zu unterstützen. Willkommen in einer Welt,
					in der Gesundheit zum Abenteuer wird!
				</p>
			</div>
			<section className="text-center my-8">
				<SectionHeaders subHeader={"Nicht zögern"} mainHeader={"Contact us"} />
				<div className="mt-8">
					<a
						className="text-4xl underline text-gray-500"
						href="tel:+49123456789"
					>
						+49 123 456 789
					</a>
				</div>
			</section>
		</>
	);
}
