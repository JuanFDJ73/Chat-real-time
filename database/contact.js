import jwt from 'jsonwebtoken';
import { db } from "../database/db.js";
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import { getLatestMessageDB, getMessage } from './message.js';
import { getUserNameContact } from './contactName.js';
dotenv.config();

const cache = new NodeCache();

const database = process.env.DB_NAME
const secretKey = process.env.SECRET_KEY;
const dataContact = process.env.DATA_CONTACT

//Route
const contactButtonClick = async (req, res) => {
    //Funcionalidad del button contact, trae los mensajes de la base de datos
    try {
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
    } catch (error) {
        console.error('Error al recuperar y ordenar mensajes:', error);
        res.status(500).send('Ocurrió un error al procesar su solicitud.');
    }
}

//Route
const searchContacts = async (req, res) => {
    //Busca todos los contactos que tenga el usuario en la DB
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
                getUserNameContact(userId, contactId)
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
}

//Route
const findContactId = async (req, res) => {
    //Busca si el contacto que busca el usuario existe.
    try {
        const contactId = req.body.contactId
        console.log("Contact ID received:", contactId);

        const usuario = await findContactIdDB(contactId);
        console.log(usuario);
        res.status(200).send(usuario);
    } catch (error) {
        console.error("Error database: ", error);
        res.status(500);
    }
}

async function findContactIdDB(contactId) {
    //Encuentra el contact y su imagen
    const userRef = db.collection(database).doc(contactId);
    const doc = await userRef.get();
    if (doc.exists) {
        console.log(`Image:`, doc.data().image);
        console.log(`contenido`, doc.data().username)
        const username = doc.data().username;
        const img = doc.data().image;
        return { contactId, img , username};
    }
}



async function ifBlocked(userId, contactoId) {
    //Revisa si el contacto bloqueo al usuario
    const cacheKey = `block_${contactoId}_${userId}`;
    const cachedValue = cache.get(cacheKey);
    if (cachedValue !== undefined) {
        return cachedValue;
    }

    const dataDocRef = db.collection(database).doc(contactoId).collection(userId).doc(dataContact);
    const doc = await dataDocRef.get();
    if (doc.exists) {
        const block = doc.data().block;
        cache.set(cacheKey, block);
        return block;
    } else {
        return false;
    }
}

export {
    contactButtonClick,
    searchContacts,
    findContactId,
    ifBlocked,
    findContactIdDB
};