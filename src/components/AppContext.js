"use client";

import { createContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export const RecipeBookContext = createContext({});

export function AppProvider({ children }) {
	const [recipeBookItems, setRecipeBookItems] = useState([]);

	const ls = typeof window !== "undefined" ? window.localStorage : null;

	useEffect(() => {
		if (ls && ls.getItem("recipe-book")) {
			setRecipeBookItems(JSON.parse(ls.getItem("recipe-book")));
		}
	}, [ls]);

	function clearRecipeBook() {
		setRecipeBookItems([]);
		saveRecipeBookItemToLocalStorage([]);
	}

	function removeRecipeBookItem(indexToRemove) {
		console.log("removeRecipeBookItem called with index", indexToRemove);
		setRecipeBookItems((prevRecipeBookItem) => {
			const newRecipeBookItem = prevRecipeBookItem.filter(
				(v, index) => index !== indexToRemove
			);
			saveRecipeBookItemToLocalStorage(newRecipeBookItem, () => {
				// Hier kannst du weitere Aktionen durchführen, nachdem localStorage aktualisiert wurde
				console.log("Recipe removed from localStorage");
				// toast.success("Rezept entfernt");
			});
			return newRecipeBookItem;
		});
	}

	function saveRecipeBookItemToLocalStorage(recipeBookItem, callback) {
		if (ls) {
			ls.setItem("recipe-book", JSON.stringify(recipeBookItem));
			// Füge eine Callback-Funktion hinzu, die nach dem Speichern aufgerufen wird
			callback && callback();
		}
	}

	function addToRecipeBook(recipe, numberOfPeople = null, ingredients = []) {
		setRecipeBookItems((prevRecipe) => {
			const recipeBookItem = { ...recipe, numberOfPeople, ingredients };
			const newRecipes = [...prevRecipe, recipeBookItem];
			saveRecipeBookItemToLocalStorage(newRecipes);
			return newRecipes;
		});
	}

	return (
		<SessionProvider>
			<RecipeBookContext.Provider
				value={{
					recipeBookItems,
					setRecipeBookItems,
					addToRecipeBook,
					removeRecipeBookItem,
					clearRecipeBook,
				}}
			>
				{children}
			</RecipeBookContext.Provider>
		</SessionProvider>
	);
}
