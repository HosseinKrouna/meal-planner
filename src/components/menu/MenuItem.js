import Image from "next/image";

function MenuItem() {
	return (
		<div className="bg-gray-200 p-4 rounded-lg text-center">
			<Image
				src={"/photo-home-menu-pita.jpg"}
				width={350}
				height={290}
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
