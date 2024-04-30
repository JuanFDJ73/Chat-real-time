import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();
import { storage } from "../database/db.js";
import { db } from "../database/db.js";
import { tokenUserId } from "./cookieUserId.js";

const database = process.env.DB_NAME
const secretKey = process.env.SECRET_KEY;

const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const token = req.cookies.jwtChatOp;
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }

    const { userId } = jwt.verify(token, secretKey);
    const currentImageUrl = await getImage(userId);

    const bucket = storage.bucket(); // Obtener el bucket de Firebase Storage
    const file = bucket.file(req.file.originalname);
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (e) => {
        console.error(e);
        res.status(500).send('Failed to upload image.');
    });

    stream.on('finish', async () => {
        try {
            // Hacer el archivo público
            await file.makePublic();

            // Obtener la URL pública
            const publicUrl = file.publicUrl();

            // Actualizar la imagen en la base de datos
            await updateDbUserImage(userId, publicUrl);

            // Eliminar la imagen anterior, si existe
            if (currentImageUrl) {
                await deleteImage(currentImageUrl);
            }

            res.status(200).json({ image: publicUrl });
        } catch (error) {
            console.error('Error al actualizar la imagen del user:', error);
            res.status(500).send('Error al actualizar la imagen del user en database.');
        }
    });

    stream.end(req.file.buffer);
};

const getUserImage = async (req, res) => {
    try {
        const userId = await tokenUserId(req);
        const img = await getImage(userId);
        res.status(200).json({ image: img });
    } catch (error) {
        res.status(400).send('Token inválido');
    }
}

async function getImage(userId) {
    // Obtener la imagen del usuario en la base de datos
    const userRef = db.collection(database).doc(userId);
    const doc = await userRef.get();
    if (doc.exists) {
        console.log(`Image:`, doc.data().image);
        return doc.data().image;
    } else {
        return null;
    }
}

async function updateDbUserImage(userId, imageUrl) {
    // Actualizar la imagen del usuario en la base de datos
    const dbRef = db.collection(database).doc(userId);
    return dbRef.set({
        image: imageUrl
    }, { merge: true });
}

async function deleteImage(currentImageUrl) {
    // Borra la imagen que no se utiliza del usuario en la base de datos
    const fileName = currentImageUrl.split('/').pop().split('?')[0]; // Extraer el nombre del archivo desde URL
    const bucket = storage.bucket();
    const oldFile = bucket.file(decodeURIComponent(fileName));
    await oldFile.delete();
}

export { uploadImage, getImage, getUserImage};