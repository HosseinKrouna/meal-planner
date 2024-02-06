// import { createContext, useContext, useState } from "react";

// const RecipeBookContext = createContext();

// export const RecipeBookProvider = ({ children }) => {
// 	const [recipeBookItems, setRecipeBookItems] = useState([]);

// 	const addRecipeBookItem = (item) => {
// 		setRecipeBookItems((prevItems) => [...prevItems, item]);
// 	};

// 	const removeRecipeBookItem = (index) => {
// 		setRecipeBookItems((prevItems) => {
// 			const updatedItems = [...prevItems];
// 			updatedItems.splice(index, 1);
// 			return updatedItems;
// 		});
// 	};

// 	return (
// 		<RecipeBookContext.Provider
// 			value={{ recipeBookItems, addRecipeBookItem, removeRecipeBookItem }}
// 		>
// 			{children}
// 		</RecipeBookContext.Provider>
// 	);
// };

// export const useRecipeBook = () => {
// 	return useContext(RecipeBookContext);
// };
