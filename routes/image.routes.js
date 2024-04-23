import jwt from 'jsonwebtoken';
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { uploadImage, upload, getImage} from "../database/image.js";
dotenv.config();

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

router.use(bodyParser.json());

router.post('/api/upload-image', upload.single('file'), uploadImage);

router.get('/api/get-user-image', (req, res) => {
    const token = req.cookies.jwtChatOp;
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    const { userId } = jwt.verify(token, secretKey);
    try {
        const img = getImage(userId);
        res.status(200).json({ image: img });
    } catch (error) {
        res.status(400).send('Token inválido');
    }
});

export default router;