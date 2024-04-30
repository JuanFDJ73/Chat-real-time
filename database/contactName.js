import { db } from "../database/db.js";
import dotenv from "dotenv";
dotenv.config();

async function getUserNameContact(userId, contactId) {
    //Obtiene el nombre que el usuario le asigno al contacto, Si no tiene, trae el ContactId
    const docRef = db.collection(`${database}/${userId}/${contactId}`);
    const docSnapshot = await docRef.get();
    const nombre = docSnapshot.docs[0].data().name;
    if (nombre) {
        return nombre;
    } else {
        return contactId
    }
}

export {
    getUserNameContact
}