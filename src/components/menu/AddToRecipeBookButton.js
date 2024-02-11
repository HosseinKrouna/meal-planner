// import FlyingButton from "react-flying-item";
// import BookOpen from "../icons/BookOpen";

// export default function AddToRecipeBookButton({ onClick, image }) {
// 	return (
// 		<div className="flying-button-parent">
// 			<FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
// 				<div
// 					className="flex items-center"
// 					style={{ fontSize: "14px", lineHeight: "1" }}
// 					onClick={onClick}
// 				>
// 					<span className="mr-1">Hinzufügen</span>
// 					<BookOpen />
// 				</div>
// 			</FlyingButton>
// 		</div>
// 	);
// }

// import { useState } from "react";
// import { useSpring, animated } from "react-spring";
// import BookOpen from "../icons/BookOpen";

// export default function AddToRecipeBookButton({ onClick, image }) {
// 	const [isFlying, setIsFlying] = useState(false);

// 	const flyingButtonProps = useSpring({
// 		opacity: isFlying ? 0 : 1,
// 		transform: `translate(0%, ${isFlying ? "-100%" : "0%"})`,
// 	});

// 	return (
// 		<animated.div
// 			className="flying-button-parent"
// 			style={{
// 				position: "absolute",
// 				top: flyingButtonProps.targetTop,
// 				left: flyingButtonProps.targetLeft,
// 				opacity: flyingButtonProps.opacity,
// 				transform: flyingButtonProps.transform,
// 			}}
// 			onClick={() => {
// 				setIsFlying(true);
// 				flyingButtonProps.onRest = () => {
// 					setIsFlying(false);
// 					onClick();
// 				};
// 			}}
// 		>
// 			<div>
// 				{/* Your button content */}
// 				<BookOpen />
// 			</div>
// 		</animated.div>
// 	);
// }
