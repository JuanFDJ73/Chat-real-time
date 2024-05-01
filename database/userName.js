import { db } from "../database/db.js";
import dotenv from "dotenv";
dotenv.config();

async function getDbUserName(user) {
    
}

async function updateDbUserName (userId){
    // Actualizar el nombre del usuario en la base de datos
    const dbRef = db.collection(database).doc(userId);
    return dbRef.set({
        username: userId
    }, { merge: true });
}

async function deleteDbUserName (userId){
    // Elimina el nombre del usuario en la base de datos
    const dbRef = db.collection(database).doc(userId);
    return dbRef.set({
        username: null
    }, { merge: true });
}

export {
    getDbUserName,
    updateDbUserName,
    deleteDbUserName
}