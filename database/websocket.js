import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import db from "../database/db.js";
dotenv.config();

//Conexion con el websocket
export default function initializeWebSocket(io, db) { 
    io.on('connection', async (socket) => {
        console.log('a user has connected')
    
        socket.on('disconnect', () => {
            console.log('a user has disconnected')
        })
    
        socket.on('chat message', (message, userId, contactId) => {
            console.log(message);
            console.log("userId: " + userId);
    
            // contactoID sera el Id del chat del usuario(tendre su imagen, nombre y el chat en cuestion)
            const usuario = "UsuarioPrueba"
            
            const nuevoMensaje = {
                texto: message,
                usuario: usuario,
                userId: userId, // ID del remitente
                contactoId: contactId, // ID del destinatario
                image: "Ruta de la imagen",
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            };

            // Referencia a la colección de mensajes del usuario
            const mensajesCollection = db.collection(`mensajes/${userId}/${contactId}`);
    
            // Crear un nuevo documento con un ID automático y guardar el nuevo mensaje
            mensajesCollection.add(nuevoMensaje).then((docRef) => {
                console.log('Mensaje guardado en Firestore con ID:', docRef.id);
            }).catch((error) => {
                console.error('Error al guardar mensaje en Firestore: ', error);
            });

            // Emitir el mensaje a todos los usuarios
            io.emit('chat message', message, userId);
        });
    
    });
}
