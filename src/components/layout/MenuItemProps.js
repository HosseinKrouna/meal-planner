"use client";

import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";
import { useState } from "react";

function MenuItemProps({ name, props, setProps, addLabel }) {
	const [isOpen, setIsOpen] = useState(false);

	function addProp() {
		setProps((oldProps) => {
			// Falls oldProps undefined ist, starte mit einem leeren Array
			const existingProps = oldProps || [];
			return [...existingProps, { name: "" }];
		});
	}

	function editProp(ev, index, prop) {
		const newValue = ev.target.value;
		console.log("Neuer Wert:", newValue);

		setProps((prevProps) => {
			const newProps = [...prevProps];
			newProps[index] = +newValue;
			console.log("Neue Props:", newProps);
			return newProps;
		});
	}

	function removeProp(indexToRemove) {
		setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
	}

	return (
		<div className="bg-gray-200 p-2 rounded-md mb-2">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="inline-flex p-1 border-0 justify-start"
				type="button"
			>
				{isOpen && <ChevronUp />}
				{!isOpen && <ChevronDown />}
				<span>{name}</span>
				<span>({props?.length})</span>
			</button>
			<div className={isOpen ? "block" : "hidden"}>
				{props?.length > 0 &&
					props.map((peopleNumber, index) => (
						<div key={index} className="flex items-end gap-2">
							<div>
								<label>Name</label>
								<input
									type="text"
									placeholder="Anzahl der Personen"
									value={peopleNumber.name}
									onChange={(ev) => editProp(ev, index, "name")}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={() => removeProp(index)}
									className="bg-white mb-2 px-2"
								>
									<Trash />
								</button>
							</div>
						</div>
					))}
				<button
					type="button"
					onClick={addProp}
					className="bg-white items-center"
				>
					<Plus className="w-4 h-4" />
					<span>{addLabel}</span>
				</button>
			</div>
		</div>
	);
}

export default MenuItemProps;
