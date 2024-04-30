import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

//NAME: Nombre que se pondra el mismo usuario (Publico)

//Obtiene el nombre Original de la base de datos
router.get('/api/get-user-name', getUserName);

export default router;