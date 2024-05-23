import dotenv from "dotenv";
dotenv.config();
import { storage } from "../database/db.js";
import { db } from "../database/db.js";
import { tokenUserId } from "./cookieUserId.js";

const database = process.env.DB_NAME

//Route
const userUploadImage = async (req, res) => {
    const base64String = req.body.file;
    if (!base64String) {
        return res.status(400).send('No file uploaded.');
    }

    const buffer = Buffer.from(base64String.split(',')[1], 'base64');
    const userId = tokenUserId(req);
    const currentImageUrl = await getImageDB(userId);

    const bucket = storage.bucket();
    const file = bucket.file(`${userId}/${Date.now()}.png`);
    const stream = file.createWriteStream({
        metadata: {
            contentType: 'image/png'
        }
    });

    stream.on('error', (e) => {
        console.error(e);
        res.status(500).send('Failed to upload image.');
    });

    stream.on('finish', async () => {
        try {
            await file.makePublic();
            const publicUrl = file.publicUrl();
            await updateDbUserImage(userId, publicUrl);
            if (currentImageUrl) {
                await deleteDBUserImage(currentImageUrl);
            }
            res.status(200).json({ image: publicUrl });
        } catch (error) {
            console.error('Error al actualizar la imagen del user:', error);
            res.status(500).send('Error al actualizar la imagen del user en database.');
        }
    });

    stream.end(buffer);
};

async function updateDbUserImage(userId, imageUrl) {
    // Actualizar la imagen del usuario en la base de datos
    const dbRef = db.collection(database).doc(userId);
    return dbRef.set({
        image: imageUrl
    }, { merge: true });
}

//Route
const getUserImage = async (req, res) => {
    try {
        const userId = await tokenUserId(req);
        const img = await getImageDB(userId);
        res.status(200).json({ image: img });
    } catch (error) {
        res.status(400).send('Token inválido');
    }
}


async function getImageDB(userId) {
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

async function deleteDBUserImage(currentImageUrl) {
    // Borra la imagen que no se utiliza del usuario en la base de datos
    const fileName = currentImageUrl.split('/').pop().split('?')[0]; // Extraer el nombre del archivo desde URL
    const bucket = storage.bucket();
    const oldFile = bucket.file(decodeURIComponent(fileName));
    await oldFile.delete();
}

//Route
async function deleteUserImage(req, res) {
    try {
        const userId = await tokenUserId(req);
        const currentImageUrl = await getImageDB(userId);
        if (currentImageUrl) {
            await deleteDBUserImage(currentImageUrl);//Elimina de la storage de firebase
        }
        await db.collection(database).doc(userId).update({ image: null });//Elimina de la base de datos
        res.status(200).json({ message: 'Imagen eliminada' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export {
    userUploadImage,
    updateDbUserImage,
    getUserImage,
    getImageDB,
    deleteUserImage,
    deleteDBUserImage,
}