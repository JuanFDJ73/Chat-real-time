import { db } from "../database/db.js";
import admin from 'firebase-admin';
import dotenv from "dotenv";
import { tokenUserId } from "./cookieUserId.js";
import { tokenContactId } from "./cookieContactId.js";
dotenv.config();

const database = process.env.DB_NAME
const dataContact = process.env.DATA_CONTACT

const getUserNick = async (req, res) => {
    try {
        const userId = tokenUserId(req);
        const contactId = req.body.contactId;
        const dbRef = db.collection(database).doc(userId).collection(contactId).doc(dataContact)
        const doc = await dbRef.get();
        const nick = doc.data().nick;
        
        if (nick) {
            res.status(200).json({ nick });
        } else {
            res.status(200).json({ contactId });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el nick del usuario" });
    }
}


const uploadUserNick = async (req, res) => {
    //Actualiza el nombre (nick) que el usuario le dio al contacto
    try {
        const userId = tokenUserId(req);
        const contactId = tokenContactId(req);
        const nick = req.body.nick;
        const dbRef = db.collection(database).doc(userId).collection(contactId).doc(dataContact)

        dbRef.set({
            nick: nick
        }, { merge: true })

        res.status(200).send("Nick actualizado correctamente");
    } catch (error) {
        res.status(404).send("No se pudo actualizar el nick del usuario");
    }
}

const deleteUserNick = async (req, res) => {
    //Elimina el nombre(nick) que el usuario le dio al contacto
    try {
        const userId = tokenUserId(req);
        const contactId = tokenContactId(req);
        const dbRef = db.collection(database).doc(userId).collection(contactId).doc(dataContact)

        await dbRef.update({
            nick: admin.firestore.FieldValue.delete()
        });

        res.status(200).send("Nick eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar el nick del usuario: ", error);
        res.status(500).send("No se pudo eliminar el nick del usuario debido a un error");
    }
}

export {
    getUserNick,
    uploadUserNick,
    deleteUserNick
}