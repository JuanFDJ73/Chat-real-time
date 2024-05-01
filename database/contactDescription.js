import { db } from "../database/db.js";
import dotenv from "dotenv";
dotenv.config();

const database = process.env.DB_NAME
const secretKey = process.env.SECRET_KEY;

const getContactDescription = async (req, res) => {
    try {
        const contactId = await tokenContactId(req);
        const dbRef = db.collection(database).doc(contactId);
        const doc = await dbRef.get();

        if (doc.exists) {
            const description = doc.data().description || ""; // Asegura retornar una cadena incluso si description no existe
            console.log("Description: ", description);
            res.status(200).send(description); // Envía respuesta 200 OK con la descripción
        } else {
            console.log("No se encontró el documento para el contacto:", contactId);
            res.status(404).send("No se encontró el documento del contacto"); // 404 Not Found si no existe el documento
        }
    } catch (error) {
        console.error("Error al obtener la descripción del contacto:", error);
        res.status(500).send("Error al obtener la descripción: " + error.message); // 500 Internal Server Error para errores generales
    }
}

export {
    getContactDescription
}