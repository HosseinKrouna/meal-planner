import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function RecipeBookItem({ recipe, onRemove }) {
	//FIXME - 👇 div key ingredients.name => id.uuid4
	return (
		<div className="flex items-center gap-4 border-b py-4">
			<div className="w-24">
				<Image
					width={240}
					height={240}
					src={recipe.image}
					alt={"Recipe image"}
				/>
			</div>
			<div className="grow">
				<h3 className="font-semibold">{recipe.name}</h3>
				{recipe.numberOfPeople && (
					<div className="text-sm">
						Zutaten für <span>{recipe.numberOfPeople} Personen</span>
					</div>
				)}
				{recipe.ingredients?.length > 0 && (
					<div className="text-sm text-gray-500">
						{recipe.ingredients.map((ingredient) => (
							<div key={ingredient.name}>
								{ingredient.name}: {ingredient.quntity} {ingredient.unit}
							</div>
						))}
					</div>
				)}
			</div>
			{/* <div className="text-lg font-semibold"></div> */}
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
	);
}
