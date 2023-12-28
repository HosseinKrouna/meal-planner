import Image from "next/image";
import Right from "../icons/Right";

function Hero() {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-8 max-w-full md:max-w-screen-lg mx-auto overflow-x-hidden">
			<div className="order-2 md:order-1 py-8">
				<h1 className="text-2xl leading-12 md:text-4xl font-semibold mb-4 md:mb-6">
					Für dein
					<br /> Wohlbefinden <br />
					gesunde <span className="text-primary">Speisepläne</span> <br />
				</h1>
				<p className="text-sm my-6 md:text-base text-gray-500 mb-4 md:mb-6">
					Entdecke in unserer App VitalitätsKüche eine Fülle an köstlichen,
					ausgewogenen Speiseplänen, die deine Gesundheit fördern und dir
					helfen, deine Ziele zu erreichen – egal, ob du abnehmen, mehr Energie
					haben oder einfach gesünder leben möchtest!
				</p>
				<div className="flex  text-sm flex-col md:flex-row gap-4">
					<button className="flex items-center justify-center gap-4 bg-primary uppercase text-white px-4 py-2 rounded-full">
						Wähle jetzt
						<Right />
					</button>
					<button className="flex items-center justify-center gap-2 px-4 py-2  text-gray-600 font-semibold">
						Learn more
						<Right />
					</button>
				</div>
			</div>

			<div className="relative order-1 md:order-2">
				<Image
					src="/photo-hero-food.png"
					alt="picture of different vegetables"
					width={700}
					height={500}
				/>
			</div>
		</section>
	);
}

export default Hero;
