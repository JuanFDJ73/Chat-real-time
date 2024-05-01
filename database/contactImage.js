import dotenv from "dotenv";
dotenv.config();
import { db } from "../database/db.js";

const database = process.env.DB_NAME
const secretKey = process.env.SECRET_KEY;

async function getImage(userId) {
    // Obtener la imagen del usuario (sea user o contact) en la base de datos
    const userRef = db.collection(database).doc(userId);
    const doc = await userRef.get();
    if (doc.exists) {
        console.log(`Image:`, doc.data().image);
        return doc.data().image;
    } else {
        return null;
    }
}

export { getImage};