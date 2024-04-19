import db from "../database/db.js";
import dotenv from 'dotenv';
dotenv.config();

const database = process.env.DB_NAME
const mensajes = process.env.DB_MENSAJES
const dataContact = process.env.DATA_CONTACT

export async function  getMessage (userId, contactId){
    const mensajesUsuarioQuery = db.collection(`${database}/${userId}/${contactId}/${mensajes}`).orderBy("timestamp");
    const mensajesContactoQuery = db.collection(`${database}/${contactId}/${userId}/${mensajes}`).orderBy("timestamp");

    const [messageUsuarioSnap, messageContactoSnap] = await Promise.all([
        mensajesUsuarioQuery.get(),
        mensajesContactoQuery.get()
    ]);

    const messagesUsuario = messageUsuarioSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: new Date(doc.data().timestamp) }));
    const messagesContacto = messageContactoSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: new Date(doc.data().timestamp) }));

    const allMessages = [...messagesUsuario, ...messagesContacto];
    allMessages.sort((a, b) => a.timestamp - b.timestamp);

    return allMessages;
}

export async function findContactId(contactId) {
    const dbRef = db.collection(`${database}`);
    const querySnapshot = await dbRef.get();

    //ruta de la imagen prueba, se hara de la base de datos
    //const img = "/image/icon-woman.png"

    let userFoundId = null;
    let img = "";
    querySnapshot.forEach(async users => {
        const userId = users.id;
        const userContent = users.data();
        console.log('user Id:', userId);
        //nombre de ej. se usara la ruta de la imagen
        console.log('Contenido:', userContent.nombre);
        console.log('imagen: ', userContent.image);
        if (userId === contactId) {
            userFoundId = userId
            img = userContent.image;
        }
    });
    return {userFoundId, img};
}

export async function getLatestMessageDB(userId, contactId) {
    const mensajesUsuarioQuery = db.collection(`${database}/${userId}/${contactId}/${mensajes}`).orderBy("timestamp", "desc").limit(1);
    const mensajesContactoQuery = db.collection(`${database}/${contactId}/${userId}/${mensajes}`).orderBy("timestamp", "desc").limit(1);

    const [latestUsuarioSnap, latestContactoSnap] = await Promise.all([
        mensajesUsuarioQuery.get(),
        mensajesContactoQuery.get()
    ]);

    const lastMessageUsuario = latestUsuarioSnap.docs[0] ? {
        id: latestUsuarioSnap.docs[0].id,
        ...latestUsuarioSnap.docs[0].data(),
        timestamp: new Date(latestUsuarioSnap.docs[0].data().timestamp),
        sender: userId  // Indica que el mensaje fue enviado por el usuario
    } : null;

    const lastMessageContacto = latestContactoSnap.docs[0] ? {
        id: latestContactoSnap.docs[0].id,
        ...latestContactoSnap.docs[0].data(),
        timestamp: new Date(latestContactoSnap.docs[0].data().timestamp),
        sender: contactId  // Indica que el mensaje fue enviado por el contacto
    } : null;

    // Comparar y devolver el mensaje más reciente con información del remitente
    if (!lastMessageUsuario && !lastMessageContacto) {
        return null; // No hay mensajes
    } else if (!lastMessageUsuario) {
        return lastMessageContacto;
    } else if (!lastMessageContacto) {
        return lastMessageUsuario;
    } else {
        return lastMessageUsuario.timestamp > lastMessageContacto.timestamp ? lastMessageUsuario : lastMessageContacto;
    }
}

export async function getUsuarioContacts(userId, contactId) {
    const docRef = db.collection(`${database}/${userId}/${contactId}`);
    const docSnapshot = await docRef.get();
    const nombre = docSnapshot.docs[0].data().name;
    if (nombre) {
        return nombre;
    } else {
        return contactId
    }
}