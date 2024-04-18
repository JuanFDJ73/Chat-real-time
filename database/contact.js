import db from "../database/db.js";
import dotenv from 'dotenv';
dotenv.config();

const database = process.env.DB_NAME;

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
    // Query para obtener el último mensaje enviado por el usuario al contacto
    const lastMessageFromUserQuery = db.collection(`mensajes/${userId}/${contactId}`)
        .orderBy("timestamp", "desc") // Ordenamos por timestamp de forma descendente
        .limit(1); // Limitamos a 1 resultado

    // Query para obtener el último mensaje enviado por el contacto al usuario
    const lastMessageFromContactQuery = db.collection(`mensajes/${contactId}/${userId}`)
        .orderBy("timestamp", "desc") // Ordenamos por timestamp de forma descendente
        .limit(1); // Limitamos a 1 resultado

    // Ejecutamos ambas consultas en paralelo
    const [lastMessageFromUserSnap, lastMessageFromContactSnap] = await Promise.all([
        lastMessageFromUserQuery.get(),
        lastMessageFromContactQuery.get()
    ]);

    // Extraemos los documentos si existen
    const lastMessageFromUser = lastMessageFromUserSnap.docs[0] ? { id: lastMessageFromUserSnap.docs[0].id, ...lastMessageFromUserSnap.docs[0].data() } : null;
    const lastMessageFromContact = lastMessageFromContactSnap.docs[0] ? { id: lastMessageFromContactSnap.docs[0].id, ...lastMessageFromContactSnap.docs[0].data() } : null;

    // Comparamos y seleccionamos el mensaje más reciente
    if (lastMessageFromUser && lastMessageFromContact) {
        if (lastMessageFromUser.timestamp.toDate() > lastMessageFromContact.timestamp.toDate()) {
            return { ...lastMessageFromUser, sender: userId };
        } else {
            return { ...lastMessageFromContact, sender: contactId };
        }
    } else if (lastMessageFromUser) {
        return { ...lastMessageFromUser, sender: userId };
    } else if (lastMessageFromContact) {
        return { ...lastMessageFromContact, sender: contactId };
    } else {
        return null; // No messages found
    }
}