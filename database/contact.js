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