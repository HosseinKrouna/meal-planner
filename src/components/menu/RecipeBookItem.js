import Trash from "@/components/icons/Trash";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../layout/DeleteButton";

export default function RecipeBookItem(props) {
	const { name, onRemove, recipeBookItemsId, image } = props;

	return (
		<div className=" bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
			<div className="text-center">
				<Image
					className="max-h-auto max-h-24 block mx-auto"
					width={220}
					height={150}
					src={image}
					alt={"Recipe image"}
				/>
			</div>
			<h3 className="font-semibold text-xl my-3 mt-8">{name}</h3>
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
					<DeleteButton
						label={<Trash />}
						onDelete={() => onRemove()}
						onClassName="p-2 mt-2 bg-gray-100"
					/>
				</div>
			)}
		</div>
	);
}
