import Image from "next/image";

function Hero() {
	return (
		<section className="grid grid-cols-2">
			<div>
				<h1 className="text-4xl font-semibold">
					Gesunde Speisepläne für ein besseres Leben
				</h1>
				<p className="mt-4 text-gray-500">
					Entdecke in unserer App VitalitätsKüche eine Fülle an köstlichen,
					ausgewogenen Speiseplänen, die deine Gesundheit fördern und dir
					helfen, deine Ziele zu erreichen – egal, ob du abnehmen, mehr Energie
					haben oder einfach gesünder leben möchtest!
				</p>
				<div className="flex gap-4">
					<button className="bg-primary text-white px-8 py-2 rounded-full">
						Wähle jetzt
					</button>
					<button>Learn more</button>
				</div>
			</div>

			<div className="relative">
				<Image
					src="/photo-hero-food.png"
					alt="picture of different vegetables"
					layout="fill"
					objectFit="contain"
				/>
			</div>
		</section>
	);
}

export default Hero;
