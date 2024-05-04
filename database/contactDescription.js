import { db } from "../database/db.js";
import dotenv from "dotenv";
import { tokenContactId } from "./cookieContactId.js";
dotenv.config();

const database = process.env.DB_NAME

const getContactDescription = async (req, res) => {
    //Obtiene la descripción del contacto
    try {
        const contactId = await tokenContactId(req);
        const dbRef = db.collection(database).doc(contactId);
        const doc = await dbRef.get();

        if (doc.exists) {
            const description = doc.data().description || "";
            console.log("Description: ", description);
            res.status(200).send(description);
        } else {
            console.log("No se encontró el documento para el contacto:", contactId);
            res.status(404).send("No se encontró el documento del contacto");
        }
    } catch (error) {
        console.error("Error al obtener la descripción del contacto:", error);
        res.status(500).send("Error al obtener la descripción: " + error.message);
    }
}

export {
    getContactDescription
}