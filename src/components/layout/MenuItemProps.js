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
			const existingProps = oldProps || [];
			return [...existingProps, { name: "" }];
		});
	}

	function editProp(ev, index, prop) {
		const newValue = ev.target.value;

		setProps((prevProps) => {
			const newProps = [...prevProps];
			newProps[index] = { ...newProps[index], [prop]: newValue };
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
					props.map((ingredient, index) => (
						<div key={index} className="flex gap-2 mb-2">
							<div className="flex-2">
								<label>Name</label>
								<input
									type="text"
									placeholder="Zutaten"
									value={ingredient.name}
									onChange={(ev) => editProp(ev, index, "name")}
									className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
								/>
							</div>
							<div className="flex-1">
								<label>Menge</label>
								<input
									type="number"
									placeholder="0"
									value={ingredient.quantity}
									onChange={(ev) => editProp(ev, index, "quantity")}
									className="w-full p-2 mx-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
								/>
							</div>
							<div className="flex-2">
								<label className="ml-3">Einheit</label>
								<select
									value={ingredient.unit}
									onChange={(ev) => editProp(ev, index, "unit")}
									className="w-full mx-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
								>
									<option value="" className="text-center">
										X
									</option>
									<option value="g" className="text-center">
										g
									</option>
									<option value="Stück" className="text-center">
										Stk
									</option>
									<option value="EL" className="text-center">
										EL
									</option>
									<option value="TL" className="text-center">
										TL
									</option>
									<option value="ml" className="text-center">
										ml
									</option>
								</select>
							</div>
							<div className="flex items-center">
								<button
									type="button"
									onClick={() => removeProp(index)}
									className="bg-white w-full border p-2 m-2 mt-5"
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
