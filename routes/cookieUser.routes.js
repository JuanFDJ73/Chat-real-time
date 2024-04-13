import express from "express";
import jwt from 'jsonwebtoken'; 
import { verifyUserId , randomUserId } from "../database/cookieUserId.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router(); 

const secretKey = process.env.SECRET_KEY

//ruta para establecer la cookie
router.get('/api/set-user-id', (req, res) => {
    const existingCookie = req.cookies.jwtChatOp;

    if (existingCookie) {
        const userIdLocal = verifyUserId(existingCookie);
        return res.status(201).json({ userId: userIdLocal});
    }

    const userId = randomUserId();

    // Crear el JWT
    const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '30d' });

    // Enviar el JWT en una cookie (configurar httponly y secure despues) // Opciones recomendadas para cookies
    res.cookie('jwtChatOp', token); 
    res.json({ userId: userId });
});

router.get('/api/verify-user-id', (req, res) => {
    const token = req.cookies.jwtChatOp;

    if (!token) {
        return res.status(401).send('Acceso denegado');
      }

    try {
        const userId = verifyUserId(token);
        res.status(200).json({ userId: userId });
    } catch (error) {
        res.status(400).send('Token inválido');
    }
});

export default router;