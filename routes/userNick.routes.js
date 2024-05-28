import express from "express";
import { deleteUserNick, getUserNick, uploadUserNick } from "../database/userNick.js";

const router = express.Router();

//USERNICK: Nombre que el usuario le asigno a un contacto

//Obtiene el nick de la base de datos
router.post('/api/get-user-nick', getUserNick);

//Actualiza el nick de la base de datos
router.post('/api/upload-user-nick', uploadUserNick);

//Borra el nick de la base de datos
router.delete('/api/delete-user-nick', deleteUserNick);

export default router;