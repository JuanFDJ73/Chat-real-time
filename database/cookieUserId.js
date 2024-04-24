import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY

//Route
const setUserId = async (req, res) => {
    const existingCookie = req.cookies.jwtChatOp;

    if (existingCookie) {
        const userIdLocal = tokenUserId(req);
        return res.status(201).json({ userId: userIdLocal });
    }

    const userId = randomUserId();

    // Crear el JWT
    const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '30d' });

    // Enviar el JWT en una cookie (configurar httponly y secure despues) // Opciones recomendadas para cookies
    res.cookie('jwtChatOp', token);
    res.json({ userId: userId });
}

//Route
const verifyUserId = async (req, res) => {
    try {
        const userId = tokenUserId(req);
        res.status(200).json({ userId: userId });
    } catch (error) {
        res.status(400).send('Token inválido');
    }
}

function tokenUserId(req) {
    const token = req.cookies.jwtChatOp;
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    const { userId } = jwt.verify(token, secretKey);
    return userId;
}

function randomUserId() {
    const userId = "userIdprueba" //Sera una Id aleatoria
    return userId
}

export {
    setUserId,
    verifyUserId,
    randomUserId,
    tokenUserId
}