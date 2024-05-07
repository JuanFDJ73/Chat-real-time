import dotenv from "dotenv";
dotenv.config();
import { db } from "../database/db.js";

const database = process.env.DB_NAME

const getContactImg = async (req, res) => {
    try {
        const contact = req.body.contactId;
        const img = await getImage(contact);
        res.status(200).send({ image: img });
    } catch (error) {
        res.status(404).send("No se encontró la imagen del contacto");
    }
};

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

export {
    getImage,
    getContactImg
};