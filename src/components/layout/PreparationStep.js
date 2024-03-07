import { useState } from "react";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";

export default function PreparationStep({ step, index, onDelete, onUpdate }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	const handleStepChange = (e) => {
		onUpdate(index, { ...step, stepName: e.target.value });
	};

	const handleTextAreaChange = (e) => {
		onUpdate(index, { ...step, preparationDescription: e.target.value });
	};

	return (
		<div className="border mb-2 p-2">
			<div className="flex items-center justify-between">
				<span className="font-medium text-lg">{step.stepName}</span>
				<div className="flex items-center">
					<button onClick={handleToggle} className="mr-2">
						{isOpen ? <ChevronUp /> : <ChevronDown />}
					</button>
					<button onClick={() => onDelete(index)}>Löschen</button>
				</div>
			</div>
			{isOpen && (
				<div className="mt-2">
					<label>Zubereitungsschritt</label>
					<input
						type="text"
						value={step.stepName}
						onChange={handleStepChange}
						className="mt-1"
					/>
					<label>Beschreibung</label>
					<textarea
						value={step.preparationDescription}
						onChange={handleTextAreaChange}
						className="mt-1"
					/>
				</div>
			)}
		</div>
	);
}
