import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "../database/db.js";
import { collection } from "firebase/firestore";

dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

////////////////////////////////
const contactoPrueba = "contactoId"
////////////////////////////////

router.get('/api/mensajes', async function(req, res) {
    // const token = req.cookies.jwtChatOp;
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // const userId = decoded.userId;
    const userId = "userIdprueba"
    const database = process.env.DB_NAME;
    
    const userDocRef = db.collection(`${database}/${userId}/${contactoPrueba}`);//Nota: El contacto vendra de la informacion del boton

    // const collections = await userDocRef.listCollections();
    // const collectionNames = collections.map(collection => collection.id);

    console.log(userDocRef);
    res.status(200).json(userDocRef);
});


export default router;