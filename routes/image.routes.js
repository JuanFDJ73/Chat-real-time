import express from "express";
import { upload } from "../database/multer.js";
import { deleteUserImage, getUserImage, userUploadImage } from "../database/userImage.js";
import { getContactImg } from "../database/contactImage.js";

const router = express.Router();

//Sube la imagen a la base de datos y actualiza la foto en el cliente
router.post('/api/user-upload-image', upload.single('file'), userUploadImage);

router.post('/api/get-contact-image', getContactImg);

//Obtiene la imagen de la base de datos y la envia al cliente
router.get('/api/get-user-image', getUserImage);

//Eliminar la imagen de la base de datos
router.delete('/api/delete-user-image', deleteUserImage);

export default router;