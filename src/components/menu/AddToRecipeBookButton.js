import FlyingButton from "react-flying-item";

export default function AddToRecipeBookButton({ onClick, image }) {
	return (
		<div className="flying-button-parent mt-4">
			<FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
				<div onClick={onClick}>Zum Rezeptbuch hinzufügen</div>
			</FlyingButton>
		</div>
	);
}
