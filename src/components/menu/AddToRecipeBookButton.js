import BookOpen from "../icons/BookOpen";
import { motion, useAnimation } from "framer-motion";
import { useState, useContext } from "react";
import { RecipeBookContext } from "@/components/AppContext"; // Stelle sicher, dass der korrekte Pfad verwendet wird

export default function AddToRecipeBookButton({ image }) {
	const [isAdded, setIsAdded] = useState(false);
	const [showNotification, setShowNotification] = useState(false); // Neuer Zustand für die Benachrichtigung
	const { recipeBookItems, addToRecipeBook } = useContext(RecipeBookContext);
	const controls = useAnimation();

	const handleButtonClick = async () => {
		// Überprüfe, ob das Rezept bereits im Rezeptbuch vorhanden ist
		const isRecipeInBook = recipeBookItems.some((item) => item.name === image);

		// Wenn das Rezept nicht im Rezeptbuch ist, füge es hinzu
		if (!isRecipeInBook) {
			addToRecipeBook(image);
			setIsAdded(true);
			await controls.start({ opacity: 1, y: -100, x: "100vw" });
		} else {
			// Wenn das Rezept bereits im Rezeptbuch ist, zeige die Benachrichtigung an
			setShowNotification(true);
			console.log("Rezept ist bereits im Rezeptbuch vorhanden.");
		}
	};

	return (
		<>
			<div className="flying-button-parent">
				<div
					className="flex items-center"
					style={{ fontSize: "14px", lineHeight: "1" }}
					onClick={handleButtonClick}
				>
					<span className="mr-1 flying-button-parent">Hinzufügen</span>
					<BookOpen />
				</div>
			</div>
			{isAdded && (
				<>
					<motion.img
						src={image}
						width={180}
						height={100}
						className="pb-12 text-primary font-semibold"
						initial={{ opacity: 1, y: 0 }}
						animate={{ opacity: 1, y: -100, x: "100vw" }}
						exit={{ opacity: 0 }}
						transition={{ duration: 2, type: "linear" }}
						controls={controls}
						onAnimationComplete={() => setIsAdded(false)}
					/>
					<p className="text-green-500 font-semibold">
						Liegt nun in deinem Rezeptbuch!
					</p>
				</>
			)}
			{showNotification && (
				<p className="text-red-500 font-semibold">
					Rezept ist bereits im Rezeptbuch vorhanden.
				</p>
			)}
		</>
	);
}
