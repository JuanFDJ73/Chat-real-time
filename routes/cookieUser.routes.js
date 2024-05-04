import express from "express";
import { verifyUserId, setUserId } from "../database/cookieUserId.js";

const router = express.Router(); 

//ruta para establecer la cookie
router.get('/api/set-user-id', setUserId);

//Verifica la cookie (Posible cambio)
router.get('/api/verify-user-id',verifyUserId);

export default router;