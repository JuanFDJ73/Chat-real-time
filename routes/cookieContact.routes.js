import express from "express";
import { deleteCookieContact, setContactId, verifyContactId } from "../database/cookieContactId.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router(); 

//Asiga un usuario (falta que sea random, o asignado por el mismo usuario)
router.post('/api/set-contact-id', setContactId);

//Verifica si el usuario tiene un contacto asignado
router.get('/api/verify-contact-id', verifyContactId);

//Elimina el contacto asignado
router.get('/api/delete-cookie-contact', deleteCookieContact);

export default router;
