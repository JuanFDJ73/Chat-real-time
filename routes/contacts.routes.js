import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbAdmin from "../database/db.js";

dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/prueba', function(req, res) {
    try{
        const token = req.cookies.jwtChatOp;
        const contactId = req.body.contactId
    
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;
        console.log('Prueba api, userid',userId , 'contacId', contactId);
        res.status(contactId)
    } catch(error){
        res.status(400).send('api, funcionando');
    }
});

router.get('/api/contacts', async function(req, res) {
    try {
        const token = req.cookies.jwtChatOp;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;
        const database = process.env.DB_NAME;
        
        const userDocRef = dbAdmin.doc(`${database}/${userId}`);

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