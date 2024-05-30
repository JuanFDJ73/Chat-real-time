import { db } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const database = process.env.DB_NAME

//Revisar
async function getUserNickNameContact(userId, contactId) {
    // Obtiene el nombre que el usuario le asigno al contacto, Si no tiene, trae el ContactId
    const docRef = db.collection(`${database}/${userId}/${contactId}`);
    const docSnapshot = await docRef.get();
    
    if (!docSnapshot.empty) {
        const nombre = docSnapshot.docs[0].data().nick;
        if (nombre) {
            return nombre;
        }
    }
    return contactId;
}

export {
    getUserNickNameContact
}