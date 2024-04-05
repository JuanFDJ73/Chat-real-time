import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
dotenv.config();

const router = express.Router(); 

//ruta para establecer la cookie
router.get('/api/set-cookie', (req, res) => {
    const existingCookie = req.cookies.jwtChatOp;

    if (existingCookie) {
        return res.status(400).json({ error: 'La cookie ya existe' });
    }

    const userId = "userIdprueba"; //Sera una Id aleatoria
    const secretKey = process.env.SECRET_KEY;

    // Crear el JWT
    const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '30d' });

    // Enviar el JWT en una cookie (configurar httponly y secure despues) // Opciones recomendadas para cookies
    res.cookie('jwtChatOp', token); 
    res.json({ userId: userId });
});

//REVISAR
router.get('/api/verify-user-id', (req, res) => {
    const token = req.cookies.jwtChatOp;

    if (!token) {
        return res.status(401).send('Acceso denegado');
      }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        const userId = verified.userId;
        console.log("userid:",userId);
        res.status(200).json({ userId: userId });
    } catch (error) {
        res.status(400).send('Token inválido');
    }
});

export default router;
