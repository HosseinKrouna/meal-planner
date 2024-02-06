import Trash from "@/components/icons/Trash";
import Image from "next/image";
import Link from "next/link";

export default function RecipeBookItem(props) {
	console.log("RecipeBookItem Props:", props);

	const { name, onRemove, recipeBookItemsId } = props;

	return (
		<div className=" bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
			<div className="text-center">
				<Image
					className="max-h-auto max-h-24 block mx-auto"
					width={220}
					height={150}
					src={name.image}
					alt={"Recipe image"}
				/>
			</div>
			<h3 className="font-semibold text-xl my-3 mt-8">{name.name}</h3>
			<Link href={`/show-recipe-book-item/${recipeBookItemsId}`}>
				<div>
					{recipeBookItemsId ? (
						<div
							className="flex w-full justify-center gap-2 rounded-xl px-6 py-2 border-primary bg-primary text-white"
							style={{ fontSize: "18px", lineHeight: "1" }}
						>
							Weiter
						</div>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</Link>

			{!!onRemove && (
				<div className="mt-4">
					<button
						type="button"
						onClick={() => {
							onRemove();
						}}
						className="p-2 mt-2 bg-gray-100"
					>
						<Trash />
					</button>
				</div>
			)}
		</div>
	);
}
