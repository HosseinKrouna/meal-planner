import mongoose from "mongoose";
import { MenuItem } from "@/models/MenuItem";

// Einrichten der Verbindung beim Start der Anwendung
mongoose.connect(process.env.MONGO_URL);

export async function POST(req) {
	try {
		const data = await req.json();
		const menuItemDoc = await MenuItem.create(data);
		return Response.json(menuItemDoc);
	} catch (error) {
		console.error(error);
		return Response.error("Internal Server Error", { status: 500 });
	}
}

// Erweitere deine GET-API
export async function GET(req) {
	try {
		const url = new URL(req.url);
		const _id = url.searchParams.get("_id");

		if (_id) {
			// Wenn eine ID angegeben ist, gib das spezifische Rezept zurück
			const menuItem = await MenuItem.findById(_id);
			return Response.json(menuItem);
		} else {
			// Andernfalls gib alle Rezepte zurück
			const menuItems = await MenuItem.find();
			return Response.json(menuItems);
		}
	} catch (error) {
		console.error(error);
		return Response.error("Internal Server Error", { status: 500 });
	}
}

export async function PUT(req) {
	try {
		const { _id, ...data } = await req.json();
		await MenuItem.findByIdAndUpdate(_id, data);
		return Response.json(true);
	} catch (error) {
		console.error(error);
		return Response.error("Internal Server Error", { status: 500 });
	}
}

export async function DELETE(req) {
	try {
		const url = new URL(req.url);
		const _id = url.searchParams.get("_id");
		await MenuItem.deleteOne({ _id });

		return Response.json(true);
	} catch (error) {
		console.error(error);
		return Response.error("Internal Server Error", { status: 500 });
	}
}

// Schließen der Verbindung beim Herunterfahren der Anwendung
process.on("SIGINT", () => {
	mongoose.connection.close(() => {
		console.log("MongoDB Verbindung geschlossen.");
		process.exit(0);
	});
});

process.on("SIGTERM", () => {
	mongoose.connection.close(() => {
		console.log("MongoDB Verbindung geschlossen.");
		process.exit(0);
	});
});
