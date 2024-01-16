import Image from "next/image";
import toast from "react-hot-toast";

function EditableImage({ link, setLink }) {
	async function handleFileChange(event) {
		const files = event.target.files;
		if (files?.length === 1) {
			const data = new FormData();
			data.set("file", files[0]);

			const uploadPromise = fetch("/api/upload", {
				method: "POST",
				body: data,
			}).then(async (response) => {
				if (response.ok) {
					const link = await response.json();
					setLink(link);
				} else {
					const errorText = await response.text();
					throw new Error(`Something went wrong: ${errorText}`);
				}
			});

			await toast.promise(uploadPromise, {
				loading: "Uploading...",
				success: "Upload erfolgreich!",
				error: "Upload error!",
			});
		}
	}

	return (
		<>
			{link && (
				<Image
					className="rounded-lg w-full h-full mb-1"
					src={link}
					width={250}
					height={250}
					alt={"avatar"}
				/>
			)}
			{!link && (
				<div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
					No image
				</div>
			)}
			<label>
				<input type="file" className="hidden" onChange={handleFileChange} />
				<span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
					Change image
				</span>
			</label>
		</>
	);
}

export default EditableImage;
