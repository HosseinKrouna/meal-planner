import Image from "next/image";

function Hero() {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-8 max-w-full md:max-w-screen-lg mx-auto overflow-x-hidden">
			<div className="order-2 md:order-1">
				<h1 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-6">
					Gesunde Speisepläne für ein besseres Leben
				</h1>
				<p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">
					Entdecke in unserer App VitalitätsKüche eine Fülle an köstlichen,
					ausgewogenen Speiseplänen, die deine Gesundheit fördern und dir
					helfen, deine Ziele zu erreichen – egal, ob du abnehmen, mehr Energie
					haben oder einfach gesünder leben möchtest!
				</p>
				<div className="flex flex-col md:flex-row gap-4">
					<button className="bg-primary text-white px-8 py-2 rounded-full">
						Wähle jetzt
					</button>
					<button className="border px-4 py-2 rounded-full">Learn more</button>
				</div>
			</div>

			<div className="relative order-1 md:order-2">
				<Image
					src="/photo-hero-food.png"
					alt="picture of different vegetables"
					width={500}
					height={300}
				/>
			</div>
		</section>
	);
}

export default Hero;