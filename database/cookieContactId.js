import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import { tokenUserId } from './cookieUserId.js';
import { ifBlocked } from './contact.js';

const secretKey = process.env.SECRET_KEY;

//Route
const setContactId = async (req, res) => {
    // Crea cookie con token para ContactId
    const { contactId } = req.body;
    const userId = tokenUserId(req);
    const block = await ifBlocked(userId, contactId);

    const token = jwt.sign({ contactId, block }, secretKey);

    res.cookie('contactId', token)
    res.json({ contactId: contactId });
}

//Route
const verifyContactId = async (req, res) => {
    //Verifica token, si es correcto envia de respuesta el contactId
    try {
        const contactId = tokenContactId(req);
        res.status(200).json({ contactId: contactId });
    } catch (error) {
        res.status(400).send('Token inválido');
    }
}

//Route
const deleteCookieContact = async (req, res) => {
    // Establece la cookie con una fecha de expiración para que se borre
    res.cookie('contactId', '', { expires: new Date(0) });
    res.send('Cookie eliminada');
}

function tokenContactId(req) {
    // Valida token
    const token = req.cookies.contactId;
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    const { contactId } = jwt.verify(token, secretKey);
    return contactId;
}

export {
    setContactId,
    verifyContactId,
    deleteCookieContact,
    tokenContactId,
};