import React from "react";
import PreparationStep from "@/components/layout/PreparationStep";

function PreparationProps({ preparation, setPreparation }) {
	const handlePreparationChange = (e) => {
		setPreparation({
			...preparation,
			makeReadyTime: parseInt(e.target.value, 10),
		});
	};

	const handleAddPreparationStep = () => {
		setPreparation({
			...preparation,
			steps: [
				...preparation.steps,
				{ stepName: "", preparationDescription: "" },
			],
		});
	};

	const handleUpdateStep = (index, updatedStep) => {
		setPreparation({
			...preparation,
			steps: preparation.steps.map((step, i) =>
				i === index ? updatedStep : step
			),
		});
	};

	const handleDeleteStep = (index) => {
		setPreparation({
			...preparation,
			steps: preparation.steps.filter((_, i) => i !== index),
		});
	};

	const handleCookingBakingTimeChange = (e) => {
		setPreparation({
			...preparation,
			cookingBakingTime: parseInt(e.target.value, 10),
		});
	};

	return (
		<div className="bg-gray-300 rounded-md p-2 mb-3">
			<div className="mb-4">
				<label className="text-lg font-bold">Zubereitung</label>
			</div>
			<label className="font-bold">Zubereitungszeiten</label>
			<div className="flex flex-col px-2 mt-2 space-x-4">
				<div className=" mb-3 flex items-center">
					<label className="mr-2 ">Vorbereitungszeit</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={preparation.makeReadyTime}
						onChange={handlePreparationChange}
					/>
					<span className="ml-2">Minuten</span>
				</div>

				<div className="rounded-md mb-3 flex items-center">
					<label className="mr-2">Koch-/Backzeit</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={preparation.cookingBakingTime}
						onChange={handleCookingBakingTimeChange}
					/>
					<span className="ml-2">Minuten</span>
				</div>
			</div>
			<label className="font-bold">Zubereitungsschritte</label>
			{preparation.steps?.map((step, index) => (
				<PreparationStep
					key={index}
					step={step}
					index={index}
					onDelete={handleDeleteStep}
					onUpdate={handleUpdateStep}
				/>
			))}
			<textarea
				value={preparation.steps?.map((step) => step.stepName).join("\n")}
				onChange={(e) => {
					const steps = e.target.value.split("\n").map((stepName) => ({
						stepName,
						preparationDescription: "",
					}));
					setPreparation({ ...preparation, steps });
				}}
				placeholder="Geben Sie hier die Zubereitungsschritte ein..."
				className="mt-1 w-full p-2 border rounded-md"
			/>
			<button
				type="button"
				onClick={handleAddPreparationStep}
				className="mb-3 bg-white"
			>
				Zubereitungsschritt hinzufügen
			</button>
		</div>
	);
}

export default PreparationProps;
