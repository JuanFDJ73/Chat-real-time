import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import db from "../database/db.js";
dotenv.config();

const database = process.env.DB_NAME
const mensajes = process.env.DB_MENSAJES

//Conexion con el websocket
export default function initializeWebSocket(io, db) { 
    io.on('connection', async (socket) => {
        console.log('a user has connected')
    
        socket.on('disconnect', () => {
            console.log('a user has disconnected')
        })
    
        socket.on('chat message', (message, userId, contactId) => {         
            const nuevoMensaje = {
                texto: message,
                emisor: userId,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            };

            // Referencia a la colección de mensajes del usuario
            const mensajesCollection = db.collection(`${database}/${userId}/${contactId}/${mensajes}`);
            // Crear un nuevo documento con un ID automático y guardar el nuevo mensaje
            let mensajeId
            mensajesCollection.add(nuevoMensaje).then((docRef) => {
                console.log('Mensaje guardado en Firestore con ID:', docRef.id);
                mensajeId = docRef.id;
            }).catch((error) => {
                console.error('Error al guardar mensaje en Firestore: ', error);
            });

            // Emitir el mensaje a todos los usuarios
            io.emit('chat message', message, userId, contactId, mensajeId);
        });
    
    });
}
