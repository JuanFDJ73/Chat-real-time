import { db } from "../database/db.js";
import dotenv from "dotenv";
import { tokenUserId } from "./cookieUserId.js";
dotenv.config();

const database = process.env.DB_NAME

const getDbUserName = async (req, res) => {
    try {
        const userId = tokenUserId(req);
        const dbRef = db.collection(database).doc(userId)
        const doc = await dbRef.get();
        const username = doc.data().username;
        res.status(200).send({ userName: username });
    } catch (error) {
        res.status(404).send("No se encontró el username del usuario");
    }
}

const updateDbUserName = async (req, res) => {
    try {
        const userId = tokenUserId(req);
        const newUserName = req.body.userName;

        if (!newUserName) {
            throw new Error("El nombre de usuario no puede estar vacío");
        }

        const dbRef = db.collection(database).doc(userId);
        await dbRef.set({
            username: newUserName
        }, { merge: true });

        res.status(200).send("Nombre de usuario actualizado correctamente");
    } catch (error) {
        console.error("Error actualizando el nombre de usuario:", error);
        res.status(500).send("Error al actualizar el nombre de usuario: " + error.message);
    }
};


const deleteDbUserName = async (req, res) => {
    // Elimina el nombre del usuario en la base de datos
    try {
        const userId = tokenUserId(req);
        const dbRef = db.collection(database).doc(userId);
        await dbRef.set({
            username: "" //Vacio
        }, { merge: true });
        res.status(200).send("Nombre de usuario eliminado correctamente");
    } catch (error) {
        console.error("Error eliminando el nombre de usuario:", error);
        res.status(500).send("Error al eliminar el nombre de usuario: " + error.message);
    }
}

export {
    getDbUserName,
    updateDbUserName,
    deleteDbUserName
}