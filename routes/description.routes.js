import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { getContactDescription } from "../database/contactDescription.js";
import { deleteUserDescription, getUserDescription, updateUserDescription } from "../database/userDescription.js";

dotenv.config();

const router = express.Router();
router.use(bodyParser.json());
//Contact
//Obtener la descripción del contact
router.get('/api/get-contact-description', getContactDescription);

//User
//Obtener la descripción del usuario
router.get('/api/get-user-description', getUserDescription);

//Cambiar la descripción del usuario
router.post('/api/update-user-description', updateUserDescription);

//Borrar la descripción del usuario
router.delete('/api/delete-user-description', deleteUserDescription);


export default router;