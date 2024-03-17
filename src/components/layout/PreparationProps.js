import PreparationStepTile from "@/components/layout/PreparationStepTile";
import { useState } from "react";
import DeleteButton from "./DeleteButton";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";

function PreparationProps({ preparation, setPreparation, steps, setSteps }) {
	const [newPreparationStepSection, setNewPreparationStepSection] =
		useState("");

	const handlePreparationChange = (e) => {
		setPreparation({
			...preparation,
			makeReadyTime: parseInt(e.target.value, 10),
		});
	};

	const handleAddPreparationStep = () => {
		console.log("Vor dem Hinzufügen:", newPreparationStepSection);
		if (newPreparationStepSection.trim() !== "") {
			console.log("Schritt wird hinzugefügt:", newPreparationStepSection);
			setSteps((prevSteps) => [
				...prevSteps,
				{ stepName: newPreparationStepSection, preparationDescription: "" },
			]);
			setNewPreparationStepSection("");
		}
	};
	const handleUpdateStep = (index, updatedStep) => {
		console.log("Schritt wird aktualisiert:", index, updatedStep);
		setSteps((prevSteps) => [
			...prevSteps.slice(0, index),
			updatedStep,
			...prevSteps.slice(index + 1),
		]);
	};

	const handleDeleteStep = (index) => {
		console.log("Schritt wird gelöscht:", index);
		setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
	};

	const handleCookingBakingTimeChange = (e) => {
		setPreparation({
			...preparation,
			cookingBakingTime: parseInt(e.target.value, 10),
		});
	};

	const handleBrewingRestingTimeChange = (e) => {
		setPreparation({
			...preparation,
			brewingRestingTime: parseInt(e.target.value, 10),
		});
	};

	return (
		<div className="bg-gray-300 rounded-md p-2 mb-3">
			<div className="mb-4">
				<label className="text-lg font-bold">Zubereitung</label>
			</div>
			<label className="font-bold">Zubereitungszeiten</label>
			<div className="flex flex-col px-2 mt-2 space-x-4">
				<div className="mb-3 flex items-center">
					<label className="mr-2">Vorbereitungszeit</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={preparation.makeReadyTime}
						onChange={handlePreparationChange}
					/>
					<span className="ml-2">Minuten</span>
				</div>
				<div className="rounded-md mb-4 flex items-center">
					<label className="mr-2">Koch-/Backzeit</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={preparation.cookingBakingTime}
						onChange={handleCookingBakingTimeChange}
					/>
					<span className="ml-2">Minuten</span>
				</div>
				<div className="rounded-md mb-4 flex items-center">
					<label className="mr-2">Zieh-/Ruhezeit</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={preparation.brewingRestingTime}
						onChange={handleBrewingRestingTimeChange}
					/>
					<span className="ml-2">Minuten</span>
				</div>
			</div>
			<label className="font-bold">Zubereitungsschritte</label>
			<div className="mt-2">
				<label>Arbeitsschritt</label>
				<input
					type="text"
					placeholder="Erstelle hier einen neuen Arbeitsschritt"
					value={newPreparationStepSection}
					onChange={(e) => setNewPreparationStepSection(e.target.value)}
					className="mt-2"
				/>
			</div>
			<button
				type="button"
				onClick={handleAddPreparationStep}
				className="mb-3 bg-white"
			>
				<Plus />
				Arbeitsschritt hinzufügen
			</button>
			{steps.map((step, index) => (
				<div key={index} className="mb-3">
					<PreparationStepTile
						key={index}
						step={step}
						index={index}
						onDelete={(e) => handleDeleteStep(index, e)}
						onhandleUpdateStep={handleUpdateStep}
					/>
				</div>
			))}
			<div>
				<DeleteButton
					onIcon={<Trash />}
					onClassName="text-red-500 border-0"
					label={"Alle Zubereitungsschritte entfernen"}
					onDelete={() => setPreparation({ ...preparation, steps: [] })}
				/>
			</div>
		</div>
	);
}

export default PreparationProps;
