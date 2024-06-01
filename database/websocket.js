import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { ifBlocked } from './contact.js';
dotenv.config();

const database = process.env.DB_NAME
const mensajes = process.env.DB_MENSAJES

//Conexion con el websocket
export default function initializeWebSocket(io, db) {
    io.on('connection', async (socket) => {
        console.log('a user has connected');

        socket.on('disconnect', () => {
            console.log('a user has disconnected');
        });

        socket.on('chat message', async (message, userId, contactId) => {
            const block = await ifBlocked(userId, contactId);
            console.log('block: ', block);

            const nuevoMensaje = {
                texto: message,
                emisor: userId,
                receptor: contactId,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            };

            const mensajesCollection1 = db.collection(`${database}/${userId}/${contactId}/${mensajes}`);

            // Agregar el mensaje y usar el id del mensaje para el contacto
            const docRef = await mensajesCollection1.add(nuevoMensaje);
            console.log('Mensaje guardado en Firestore con ID:', docRef.id);

            // Enviar el mensaje con la Id
            io.emit('chat message', message, docRef.id, nuevoMensaje.emisor, nuevoMensaje.receptor);

            // Si NO está bloqueado, guardar el mensaje para el contacto con el mismo Id inicial
            if (!block) {
                const mensajesCollection2 = db.collection(`${database}/${contactId}/${userId}/${mensajes}`);
                await mensajesCollection2.doc(docRef.id).set(nuevoMensaje);
                console.log('Mensaje espejo guardado en Firestore con mismo ID:', docRef.id);
            }
        });
    });
}