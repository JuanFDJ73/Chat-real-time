import { db } from "../database/db.js";
import dotenv from "dotenv";
dotenv.config();

const database = process.env.DB_NAME

async function getUserDescription(userId) {
    //Consigue la descripción del usuario
    const dbRef = db.collection(database);
    const doc = await dbRef.doc(userId).get();
    const description = doc.docs[0].data().description;
    
}

async function updateUserDescription(userId, description) {

}

async function deleteUserDescription(userId) {
    //Elimina la descripción del usuario
}