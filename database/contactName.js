import { db } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const database = process.env.DB_NAME

async function getUserNameContact(userId, contactId) {
    //Obtiene el nombre que el usuario le asigno al contacto, Si no tiene, trae el ContactId
    const docRef = db.collection(`${database}/${userId}/${contactId}`);
    const docSnapshot = await docRef.get();
    const nombre = docSnapshot.docs[0].data().nick;
    if (nombre) {
        return nombre;
    } else {
        return contactId
    }
}

export {
    getUserNameContact
}