import dotenv from "dotenv";
import multer from 'multer';
dotenv.config();
import { storage } from "../database/db.js";
import { db } from "../database/db.js";

const database = process.env.DB_NAME
// const 
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB tamaño maximo
    }
});

const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

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
        // Hacer el archivo público
        await file.makePublic();
        // Obtener la URL pública
        const publicUrl = file.publicUrl();
        res.status(200).send(`Image uploaded successfully: ${publicUrl}`);
    });

    stream.end(req.file.buffer);
};

async function getImage (userId) {
    const dbRef = db.colletion(`${database}`)
    const querySnapshot = await dbRef.get();

    querySnapshot.forEach(async users => {
        const user = users.id;
        const userContent = users.data().image;
        console.log('image:',userContent);
        if (user === userId) {
            return userContent;
        }
    });
}

export { uploadImage, upload, getImage };