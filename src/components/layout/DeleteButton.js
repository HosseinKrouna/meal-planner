import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
	const [showConfirm, setShowConfirm] = useState(false);

	if (showConfirm) {
		return (
			<div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
				<div className="bg-white p-4 rounded-lg">
					<div>Bist du dir der Löschung auch ganz sicher?</div>
					<div className="flex gap-2 mt-1">
						<button type="button" onClick={() => setShowConfirm(false)}>
							Abbrechen
						</button>
						<button
							onClick={() => {
								onDelete();
								setShowConfirm(false);
							}}
							type="button"
							className="primary"
						>
							Ja,&nbsp;löschen!
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<button type="button" onClick={() => setShowConfirm(true)}>
			{label}
		</button>
	);
}
