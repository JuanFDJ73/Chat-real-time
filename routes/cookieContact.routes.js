import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
dotenv.config();

const router = express.Router(); 

const secretKey = process.env.SECRET_KEY

router.post('/api/set-contact-id', (req, res) => {
    const { contactId } = req.body;

    const token = jwt.sign({ contactId: contactId }, secretKey);

    res.cookie('contactId', token)
    res.json({ contactId: contactId });
})

router.get('/api/verify-contact-id', (req, res) => {
    const token = req.cookies.contactId;

    if (!token) {
        return res.status(401).send('Acceso denegado');
    }

    try {
        const verified = jwt.verify(token, secretKey);
        const contactId = verified.contactId;
        console.log("contactId:",contactId);
        res.status(200).json({ contactId: contactId });
    } catch (error) {
        res.status(400).send('Token inválido');
    }
})

router.get('/api/delete-cookie-contact', (req, res) => {
    // Establece la cookie con una fecha de expiración para que se borre
    res.cookie('contactId', '', { expires: new Date(0) });
    res.send('Cookie eliminada');
});


export default router;
