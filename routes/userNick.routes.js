import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { deleteUserNick, getUserNick, uploadUserNick } from "../database/userNick.js";

dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

//USERNICK: Nombre que el usuario le asigno a un contacto

//Obtiene el nick de la base de datos
router.get('/api/get-user-nick', getUserNick);

router.post('/api/upload-user-nick', uploadUserNick);

router.delete('/api/delete-user-nick', deleteUserNick);

export default router;