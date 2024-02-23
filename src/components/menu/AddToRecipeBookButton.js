import BookOpen from "../icons/BookOpen";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function AddToRecipeBookButton({ onClick, image }) {
	const [isClicked, setIsClicked] = useState(false);
	const controls = useAnimation();

	const handleButtonClick = async () => {
		setIsClicked(true);
		onClick();
		await controls.start({ opacity: 1, y: -100, x: "100vw" });
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
			{isClicked && (
				<>
					<motion.img
						src={image}
						alt="Recipe image"
						width={220}
						height={150}
						initial={{ opacity: 1, y: 0 }} // Startposition und Opazität
						animate={{ opacity: 1, y: -100, x: "100vw" }} // Endposition und Opazität
						exit={{ opacity: 0 }} // Option für den Exit-Zustand
						transition={{ duration: 2, type: "linear" }} // Dauer der Animation und lineare Bewegung
						controls={controls} // Verwendet die gleichen Animationseinstellungen für Enter und Exit
						onAnimationComplete={() => setIsClicked(false)} // Wird aufgerufen, wenn die Animation abgeschlossen ist
					/>
					<p className="pb-12 text-primary font-semibold">
						Liegt jetzt in deinem Rezeptbuch!
					</p>
				</>
			)}
		</>
	);
}
