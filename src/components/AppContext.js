"use client";

import { createContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export const RecipeBookContext = createContext({});

function getRecipeBookItemsFromLocalStorage() {
	const ls = typeof window !== "undefined" ? window.localStorage : null;

	if (ls && ls.getItem("recipe-book")) {
		return JSON.parse(ls.getItem("recipe-book"));
	}

	return [];
}

export function AppProvider({ children }) {
	const [recipeBookItems, setRecipeBookItems] = useState([]);

	const ls = typeof window !== "undefined" ? window.localStorage : null;

	useEffect(() => {
		if (ls && ls.getItem("recipe-book")) {
			setRecipeBookItems(JSON.parse(ls.getItem("recipe-book")));
		}
	}, [ls]);

	useEffect(() => {
		const storedRecipeBookItems = getRecipeBookItemsFromLocalStorage();

		if (storedRecipeBookItems.length > 0) {
			setRecipeBookItems(storedRecipeBookItems);
		}
	}, []);

	function clearRecipeBook() {
		setRecipeBookItems([]);
		saveRecipeBookItemToLocalStorage([]);
	}

	function removeRecipeBookItem(itemToRemove) {
		console.log("removeRecipeBookItem called with item", itemToRemove);
		setRecipeBookItems((prevRecipeBookItem) => {
			const newRecipeBookItem = prevRecipeBookItem.filter(
				(item) => item !== itemToRemove
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

	function addToRecipeBook(name, numberOfPeople, ingredients) {
		setRecipeBookItems((prevRecipe) => {
			const recipeBookItem = { name, numberOfPeople, ingredients };
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
