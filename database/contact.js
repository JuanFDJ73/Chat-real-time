import db from "../database/db.js";
import dotenv from 'dotenv';
dotenv.config();

export async function  getMessage (userId, contactId){
    const mensajesUsuarioQuery = db.collection(`mensajes/${userId}/${contactId}`).orderBy("timestamp");
    const mensajesContactoQuery = db.collection(`mensajes/${contactId}/${userId}`).orderBy("timestamp");

    const [messageUsuarioSnap, messageContactoSnap] = await Promise.all([
        mensajesUsuarioQuery.get(),
        mensajesContactoQuery.get()
    ]);

    let message = [];
    messageUsuarioSnap.forEach(doc => message.push({ id: doc.id, ...doc.data() }));
    messageContactoSnap.forEach(doc => message.push({ id: doc.id, ...doc.data() }));

    message.sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());
    return message;
}