import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "../database/db.js";

dotenv.config(); 

const router = express.Router();
router.use(bodyParser.json());

//////////////////////////////////////////////////////////////////
// Falta: Funcion Boton (colocar el boton seleccionado)
//////////////////////////////////////////////////////////////////
router.post('/api/contact-button', async function(req, res) {
    try{
        const token = req.cookies.jwtChatOp;
        if (!token) {
            return res.status(401).send('Acceso denegado. No se encontró el token.');
        }
        const contactId = req.body.contactId
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;

        const mensajesUsuarioQuery = db.collection(`mensajes/${userId}/${contactId}`).orderBy("timestamp");
        const mensajesContactoQuery = db.collection(`mensajes/${contactId}/${userId}`).orderBy("timestamp");

        const messageUsuarioSnap = await mensajesUsuarioQuery.get();
        const messageContactoSnap = await mensajesContactoQuery.get();

        let message = [];
        messageUsuarioSnap.forEach(doc => message.push({ id: doc.id, ...doc.data() }));
        messageContactoSnap.forEach(doc => message.push({ id: doc.id, ...doc.data() }));

        message.sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());
        res.json(message);
    } catch(error){
        console.error('Error al recuperar y ordenar mensajes:', error);
        res.status(500).send('Ocurrió un error al procesar su solicitud.');
    }
});

//////////////////////////////////////////////////////////////////
// Falta: Que traiga el name que le asigno el usuario a su contacto
//////////////////////////////////////////////////////////////////
router.get('/api/contacts', async function(req, res) {
    try {
        const token = req.cookies.jwtChatOp;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;
        const database = process.env.DB_NAME;
        
        const userDocRef = db.doc(`${database}/${userId}`);

        const collections = await userDocRef.listCollections();
        const collectionNames = collections.map(collection => collection.id);

        console.log(collectionNames);
        res.status(200).json(collectionNames);
    } catch(error) {
        console.error('Error al obtener los nombres de las subcolecciones(contactos): ', error);
        res.status(500).send('Error al obtener los nombres de las subcolecciones(contactos)');
    }
});


export default router;