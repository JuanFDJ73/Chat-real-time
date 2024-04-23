import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { db } from "../database/db.js";
import { getMessage , findContactId, getLatestMessageDB, getUsuarioContacts} from "../database/contact.js";

dotenv.config(); 

const router = express.Router();
const database = process.env.DB_NAME;
const secretKey = process.env.SECRET_KEY;

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
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;

        const message = await getMessage(userId, contactId) 
        console.log(message);
        res.json(message);
    } catch(error){
        console.error('Error al recuperar y ordenar mensajes:', error);
        res.status(500).send('Ocurrió un error al procesar su solicitud.');
    }
});

//////////////////////////////////////////////////////////////////
// Falta: Que traiga el name que le asigno el usuario a su contacto
//////////////////////////////////////////////////////////////////
router.get('/api/searchContacts', async function(req, res) {
    try {
        const token = req.cookies.jwtChatOp;
        const { userId } = jwt.verify(token, secretKey);
    
        const userDocRef = db.doc(`${database}/${userId}`);
        const collectionsSnapshot = await userDocRef.listCollections();
    
        // Obtener el último mensaje y el nombre del usuario para cada contacto de manera paralela
        const promises = collectionsSnapshot.map(async collection => {
            const contactId = collection.id;
            const [lastMessage, usuario] = await Promise.all([
                getLatestMessageDB(userId, contactId),
                getUsuarioContacts(userId, contactId)
            ]);
            return { userId, contactId, usuario, lastMessage };
        });
        const response = await Promise.all(promises);
    
        console.log('Contactos y últimos mensajes:', response);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error al obtener los datos (contactos): ', error);
        res.status(500).send('Error al obtener los datos (contactos)');
    }
});

router.post('/api/find-contact', async function(req, res) {
    try {
        const contactId = req.body.contactId
        console.log("Contact ID received:", contactId);

        const usuario = await findContactId(contactId);
        console.log(usuario);
        res.status(200).send(usuario);
    } catch (error) {
        console.error("Error database: ", error);
        res.status(500);
    }
});
export default router;