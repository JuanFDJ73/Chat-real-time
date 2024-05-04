import express from "express";
import { deleteMessage, updateMessage } from "../database/message.js";

const router = express.Router();

// Actualiza el mensaje
//Falta: agregar un undicador de que el mensaje fue modificado
router.post('/api/update-message', updateMessage);

// Elimina el mensaje
//Falta: agregar un indicador cuando el mensaje sea eliminado
router.delete('/api/delete-message', deleteMessage);


export default router;