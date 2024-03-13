function NutritionalValuesProps({
	nutritionalValuesPerServing,
	setNutritionalValuesPerServing,
}) {
	const handleCaloriesValuesChange = (e) => {
		setNutritionalValuesPerServing({
			...nutritionalValuesPerServing,
			calories: parseInt(e.target.value, 10),
		});
	};

	const handleFatValuesChange = (e) => {
		setNutritionalValuesPerServing({
			...nutritionalValuesPerServing,
			fat: parseInt(e.target.value, 10),
		});
	};

	const handleCarbohydratesValuesChange = (e) => {
		setNutritionalValuesPerServing({
			...nutritionalValuesPerServing,
			carbohydrates: parseInt(e.target.value, 10),
		});
	};

	const handleFiberValuesChange = (e) => {
		setNutritionalValuesPerServing({
			...nutritionalValuesPerServing,
			fiber: parseInt(e.target.value, 10),
		});
	};

	const handleProteinValuesChange = (e) => {
		setNutritionalValuesPerServing({
			...nutritionalValuesPerServing,
			protein: parseInt(e.target.value, 10),
		});
	};

	return (
		<div className="bg-gray-300 rounded-md p-2 mb-3">
			<div className="mb-4">
				<label className="text-lg font-bold">Nährwerte pro Portion</label>
			</div>
			<div className="flex flex-col px-2 mt-2 space-y-3">
				<div className="flex items-start">
					<label className="mr-2 w-24">Kalorien</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={nutritionalValuesPerServing.calories}
						onChange={handleCaloriesValuesChange}
					/>
					<span className="ml-2">kcal</span>
				</div>
				<div className="flex items-start">
					<label className="mr-2 w-24">Fett</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={nutritionalValuesPerServing.fat}
						onChange={handleFatValuesChange}
					/>
					<span className="ml-2">g</span>
				</div>
				<div className="flex items-start">
					<label className="mr-2 w-24">Kohlenhydrate</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={nutritionalValuesPerServing.carbohydrates}
						onChange={handleCarbohydratesValuesChange}
					/>
					<span className="ml-2">g</span>
				</div>
				<div className="flex items-start">
					<label className="mr-2 w-24">Ballaststoffe</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={nutritionalValuesPerServing.fiber}
						onChange={handleFiberValuesChange}
					/>
					<span className="ml-2">g</span>
				</div>
				<div className="flex items-start">
					<label className="mr-2 w-24">Eiweiss</label>
					<input
						type="number"
						className="rounded w-20 focus:outline-none text-center"
						value={nutritionalValuesPerServing.protein}
						onChange={handleProteinValuesChange}
					/>
					<span className="ml-2">g</span>
				</div>
			</div>
		</div>
	);
}

export default NutritionalValuesProps;
