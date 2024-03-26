import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
dotenv.config();

const router = express.Router(); 

//ruta para establecer la cookie
router.get('/api/set-cookie', (req, res) => {
    const userId = "userIdprueba";
    const secretKey = process.env.SECRET_KEY;

    // Crear el JWT
    const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '30d' });

    // Enviar el JWT en una cookie (configurar httponly y secure despues)
    res.cookie('jwtChatOp', token); // Opciones recomendadas para cookies
    res.send('JWT enviado en una cookie');
});

//REVISAR
router.get('/api/verify-cookie', (req, res) => {
    const token = req.cookies.jwtChatOp;

    if (!token) {
        return res.status(401).send('Acceso denegado');
      }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        const userId = verified.userId;
        console.log("Prueba api verify-cookie, userid:",userId);
        res.send(userId);
    } catch (error) {
        res.status(400).send('Token inválido');
    }
});

export default router;
