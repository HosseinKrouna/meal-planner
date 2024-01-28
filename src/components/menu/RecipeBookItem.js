import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function RecipeBookItem({
	name,
	numberOfPeople,
	ingredients,
	onRemove,
}) {
	return (
		<section className="mt-8">
			<div className="flex items-center gap-4 border-b py-4">
				<div className="w-24">
					<Image
						width={240}
						height={240}
						src={name.image}
						alt={"Recipe image"}
					/>
				</div>
				<div className="grow">
					<h3 className="font-semibold">{name.name}</h3>
					{numberOfPeople && (
						<div className="text-sm">
							Zutaten für <span>{numberOfPeople} Personen</span>
						</div>
					)}
					{(ingredients || []).length > 0 && (
						<div className="text-sm text-gray-500">
							{ingredients.map((ingredient) => (
								<div key={ingredient._id}>
									{ingredient.name}: {ingredient.quantity} {ingredient.unit}
								</div>
							))}
						</div>
					)}
				</div>
				{!!onRemove && (
					<div className="ml-2">
						<button
							type="button"
							onClick={() => {
								onRemove();
								console.log("onRemove wurde aufgerufen");
							}}
							className="p-2"
						>
							<Trash />
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
