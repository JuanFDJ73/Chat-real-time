import { db } from "../database/db.js";
import dotenv from "dotenv";
import { tokenUserId } from "./cookieUserId.js";
dotenv.config();

const database = process.env.DB_NAME

const getUserDescription = async (req, res) => {
    // Obtiene la descripción del usuario
    try {
        const userId = await tokenUserId(req);
        const dbRef = db.collection(database).doc(userId);
        const doc = await dbRef.get();

        if (doc.exists) {
            console.log("Description: ", doc.data().description);
            const description = doc.data().description || ""; //Si no hay description, return vacio
            res.status(200).send(description);
        } else {
            console.log("No se encontró el documento para el usuario:", userId);
            res.status(404).send("No se encontró el documento del usuario");
        }
    } catch (error) {
        console.error("Error al obtener la descripción del usuario:", error);
        res.status(500).send("Error al obtener la descripción: " + error.message);
    }
}

const updateUserDescription = async (req, res) => {
    // Actualiza el descripción del usuario
    try {
        const userId = await tokenUserId(req);
        const description = req.body.description;
        const dbRef = db.collection(database).doc(userId);

        await dbRef.set({
            description: description
        }, { merge: true });

        res.status(200).send("Descripción actualizada correctamente");
    } catch (error) {
        console.error("Error actualizando la descripción:", error);
        res.status(500).send("Error al actualizar la descripción: " + error.message);
    }
}

const deleteUserDescription = async (req, res) => {
    //Elimina la descripcion del usuario (dejando el espacio vacio)
    try {
        const userId = await tokenUserId(req);
        const dbRef = db.collection(database).doc(userId);

        await dbRef.set({
            description: ""  // Vaciar la descripción
        }, { merge: true });

        res.status(200).send("Descripción eliminada correctamente");
    } catch (error) {
        console.error("Error eliminando la descripción:", error);
        res.status(500).send("Error al eliminar la descripción: " + error.message);
    }
}

export {
    getUserDescription,
    updateUserDescription,
    deleteUserDescription
}