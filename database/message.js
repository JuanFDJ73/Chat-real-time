import { db } from "../database/db.js";
import dotenv from 'dotenv';
import { tokenUserId } from "./cookieUserId.js";
import { tokenContactId } from "./cookieContactId.js";
dotenv.config();

const database = process.env.DB_NAME
const mensajes = process.env.DB_MENSAJES

async function getMessage(userId, contactId) {
    //Consigue los mensajes del chat del usuario
    const mensajesUsuarioQuery = db.collection(`${database}/${userId}/${contactId}/${mensajes}`).orderBy("timestamp");

    const messageUsuarioSnap = await mensajesUsuarioQuery.get();

    const messagesUsuario = messageUsuarioSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.toDate() }));

    messagesUsuario.sort((a, b) => a.timestamp - b.timestamp);

    return messagesUsuario;
}

async function getLatestMessageDB(userId, contactId) {
    //Consigue el ultimo mensaje del chat
    const mensajesUsuarioQuery = db.collection(`${database}/${userId}/${contactId}/${mensajes}`).orderBy("timestamp", "desc").limit(1);

    const latestUsuarioSnap = await mensajesUsuarioQuery.get();

    const lastMessageUsuario = latestUsuarioSnap.docs[0] ? {
        id: latestUsuarioSnap.docs[0].id,
        ...latestUsuarioSnap.docs[0].data(),
        timestamp: new Date(latestUsuarioSnap.docs[0].data().timestamp),
        sender: userId  // Indica que el mensaje fue enviado por el usuario
    } : null;

    return lastMessageUsuario;
}

const deleteMessage = async (req, res) => {
    //Elimina un mensaje del chat
    try {
        const userId = tokenUserId(req);
        const contactId = tokenContactId(req);
        const messageId = req.body.messageId;
        const dbRef = db.collection(`${database}/${userId}/${contactId}/${mensajes}`).doc(messageId);
        await dbRef.delete();
        res.status(200).send("Mensaje eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar el mensaje: ", error);
        res.status(500).send("No se pudo eliminar el mensaje debido a un error");
    }
}

const updateMessage = async (req, res) => {
    //Actualiza un mensaje del chat
    try {
        const userId = tokenUserId(req);
        const contactId = tokenContactId(req);
        const messageId = req.body.messageId;
        const messageUpdate = {
            texto: req.body.messageUpdate,
        }
        const dbRef = db.collection(`${database}/${userId}/${contactId}/${mensajes}`).doc(messageId);
        await dbRef.update(messageUpdate);
        res.status(200).send("Mensaje actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar el mensaje: ", error);
        res.status(500).send("No se pudo actualizar el mensaje debido a un error");
    }
}

export {
    getMessage,
    getLatestMessageDB,
    deleteMessage,
    updateMessage
}