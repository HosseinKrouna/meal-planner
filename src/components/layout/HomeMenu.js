import MenuItem from "../menu/MenuItem";

function HomeMenu() {
	return (
		<section className="text-center">
			<div className="text-center">
				<h3 className="uppercase text-gray-500 font-semibold leading-4">
					Check out
				</h3>
				<h2 className="text-primary font-bold text-4xl italic mb-4">Menü</h2>
			</div>
			<div className=" md:grid md:grid-cols-3 md:gap-4">
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
			</div>
		</section>
	);
}

export default HomeMenu;
