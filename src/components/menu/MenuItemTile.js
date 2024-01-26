import AddToRecipeBookButton from "@/components/menu/AddToRecipeBookButton";
import Image from "next/image";

export default function MenuItemTile({ onAddToRecipeBook, ...item }) {
	const { image, description, name } = item;
	return (
		<div
			className="bg-gray-200 p-4 rounded-lg text-center
      group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
		>
			<div className="text-center">
				<Image
					src={image}
					className="max-h-auto max-h-24 block mx-auto"
					alt="pizza"
					width={50}
					height={30}
				/>
			</div>
			<h4 className="font-semibold text-xl my-3">{name}</h4>
			<p className="text-gray-500 text-sm line-clamp-3">{description}</p>
			<AddToRecipeBookButton image={image} onClick={onAddToRecipeBook} />
		</div>
	);
}
