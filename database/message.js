import { db } from "../database/db.js";
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
dotenv.config();

const cache = new NodeCache();

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

export {
    getMessage,
    getLatestMessageDB
}