import express from "express";
import { deleteDbUserName, getDbUserName, updateDbUserName } from "../database/userName.js";

const router = express.Router();

//NAME: Nombre que se pondra el mismo usuario (Publico)

//Obtiene el nombre Original de la base de datos
router.get('/api/get-user-name', getDbUserName);

//Actualiza el userName
router.post('/api/update-user-name', updateDbUserName);

//Borra el userName
router.delete('/api/delete-user-name', deleteDbUserName);

export default router;