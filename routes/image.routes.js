import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { upload } from "../database/multer.js";
import { deleteUserImage, getUserImage, userUploadImage } from "../database/userImage.js";
dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

//Sube la imagen a la base de datos y actualiza la foto en el cliente
router.post('/api/user-upload-image', upload.single('file'), userUploadImage);

//Obtiene la imagen de la base de datos y la envia al cliente
router.get('/api/get-user-image', getUserImage);

router.delete('/api/delete-user-image', deleteUserImage);

export default router;