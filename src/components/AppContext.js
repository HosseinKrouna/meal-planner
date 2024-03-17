"use client";

import { createContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import toast from "react-hot-toast";

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
		setRecipeBookItems((prevRecipeBookItem) => {
			const newRecipeBookItem = prevRecipeBookItem.filter(
				(item) => item !== itemToRemove
			);
			saveRecipeBookItemToLocalStorage(newRecipeBookItem, () => {
				// toast.success("Rezept entfernt");
			});
			return newRecipeBookItem;
		});
	}

	function saveRecipeBookItemToLocalStorage(recipeBookItem, callback) {
		if (ls) {
			ls.setItem("recipe-book", JSON.stringify(recipeBookItem));
			callback && callback();
		}
	}

	function addToRecipeBook(item) {
		// Überprüfen, ob das Element bereits im recipeBook vorhanden ist
		const recipeExists = recipeBookItems.some(
			(recipe) => recipe._id === item._id
		);

		if (recipeExists) {
			// Wenn das Rezept bereits vorhanden ist, können Sie eine Meldung anzeigen oder nichts tun
			console.log("Rezept bereits im Rezeptbuch vorhanden.");
			return;
		}

		// Fügen Sie das Rezept nur hinzu, wenn es noch nicht vorhanden ist
		setRecipeBookItems((prevRecipe) => {
			const recipeBookItem = { ...item };
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
