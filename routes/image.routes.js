import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { uploadImage, upload, getUserImage} from "../database/image.js";
dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

//Sube la imagen a la base de datos y actualiza la foto en el cliente
router.post('/api/upload-image', upload.single('file'), uploadImage);

//Obtiene la imagen de la base de datos y la envia al cliente
router.get('/api/get-user-image', getUserImage);

export default router;