import express from "express";
import { getContactDescription } from "../database/contactDescription.js";
import { deleteUserDescription, getUserDescription, updateUserDescription } from "../database/userDescription.js";

const router = express.Router();

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