import FlyingButton from "react-flying-item";
import BookOpen from "../icons/BookOpen";

export default function AddToRecipeBookButton({ onClick, image }) {
	return (
		<div className="flying-button-parent">
			<FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
				<div
					className="flex items-center"
					style={{ fontSize: "14px", lineHeight: "1" }}
					onClick={onClick}
				>
					<span className="mr-1">Hinzufügen</span>
					<BookOpen />
				</div>
			</FlyingButton>
		</div>
	);
}
