import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

function HomeMenu() {
	return (
		<section className="text-center">
			<div className="text-center">
				<SectionHeaders subHeader={"check out"} mainHeader={"Menü"} />
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
