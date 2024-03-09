import { useState } from "react";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import DeleteButton from "./DeleteButton";

export default function PreparationStepTile({
	step,
	index,
	onDelete,
	onhandleUpdateStep,
}) {
	const [localStep, setLocalStep] = useState(step);
	const [isDirty, setIsDirty] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleUpdate = () => {
		console.log("Local Step on Update:", localStep);
		onhandleUpdateStep(index, localStep);
		setIsDirty(false);
	};

	const handleStepChange = (e) => {
		const updatedStepName = e.target.value;
		setLocalStep((prevStep) => ({
			...prevStep,
			stepName: updatedStepName,
		}));
		setIsDirty(true);
	};

	const handleTextAreaChange = (e) => {
		const updatedDescription = e.target.value;
		setLocalStep((prevStep) => ({
			...prevStep,
			preparationDescription: updatedDescription,
		}));
		setIsDirty(true);
	};

	const handleToggle = (e) => {
		e.preventDefault();
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};
	return (
		<div className="flex flex-col border-2 p-3 mb-3 rounded-md items-start bg-gray-200 shadow-md border-blue-400">
			<div className="flex-1 h-8">
				<button onClick={handleToggle} className="border-0 pl-0 items-center">
					{isOpen ? <ChevronUp /> : <ChevronDown />}
					<span className="ml-2">{localStep.stepName}</span>
				</button>
			</div>

			{isOpen && (
				<div className="flex-1 w-full">
					{" "}
					<div className="flex justify-between items-center mb-2">
						<input
							type="text"
							value={localStep.stepName}
							onChange={handleStepChange}
							className="mt-1"
						/>
						<div>
							{isDirty && (
								<button onClick={handleUpdate} className="border-0 mr-2">
									Aktualisieren
								</button>
							)}
							<DeleteButton
								label={"Löschen"}
								onDelete={() => onDelete(index)}
								onClassName={"border-0 text-red-500"}
							/>
						</div>
					</div>
					<div className="flex-1 w-full">
						{" "}
						<label>Beschreibung</label>
						<textarea
							value={localStep.preparationDescription}
							onChange={handleTextAreaChange}
							className="h-24 w-full p-2 border rounded-md"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
