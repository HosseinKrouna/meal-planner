import Image from "next/image";

function MenuItem() {
	return (
		<div className="mb-4 bg-gray-200 p-4 rounded-lg text-center group hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
			<Image
				className="max-h-auto max-h-24 block mx-auto  object-contain"
				src={"/photo-home-menu-pita.png"}
				width={500}
				height={200}
				alt="Vegan gyros in pita bread with tzatziki"
			/>
			<h4 className="font-semibold text-xl my-3">
				Gyros im Pitabrot mit Tzatsiki
			</h4>
			<p className="text-gray-500 text-sm">
				Fein gebratene Jackfrucht mit roten Zwiebeln, in Olivenöl zubereitet und
				im Pitabrot gewickelt. Serviert mit knackigem Salat und hausgemachtem,
				verführerisch leckerem veganem Tzatziki. Versuchung pur!
			</p>
			<button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
				Zum Speiseplan hinzufügen
			</button>
		</div>
	);
}

export default MenuItem;
