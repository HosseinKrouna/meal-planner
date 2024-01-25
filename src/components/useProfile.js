import { useEffect, useState } from "react";

export function useProfile() {
	const [data, setData] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		console.log("fetched useProfile");

		setLoading(true);
		fetch("/api/profile").then((response) => {
			response.json().then((data) => {
				console.log(data);

				setData(data);
				setLoading(false);
			});
		});
	}, []);
	return { loading, data };
}
