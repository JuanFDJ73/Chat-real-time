import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { deleteDbUserName, getDbUserName, updateDbUserName } from "../database/userName.js";

dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

//NAME: Nombre que se pondra el mismo usuario (Publico)

//Obtiene el nombre Original de la base de datos
router.get('/api/get-user-name', getDbUserName);

router.post('/api/update-user-name', updateDbUserName);

router.delete('/api/delete-user-name', deleteDbUserName);

export default router;