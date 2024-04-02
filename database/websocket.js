import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import db from "../database/db.js";
dotenv.config();

////////////////////////////////
const contactoPrueba = "contactoId"
////////////////////////////////

//Conexion con el websocket
export default function initializeWebSocket(io, db) { 
    io.on('connection', async (socket) => {
        console.log('a user has connected')
    
        socket.on('disconnect', () => {
            console.log('a user has disconnected')
        })
    
        // Recuperar mensajes del usuario desde Firestore
        let token;
        if (socket.handshake.headers.cookie) {
            token = socket.handshake.headers.cookie.split('=')[1]; // Obtener el token de la cookie
        }

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            userId = decoded.userId;
        } catch (err) {
            console.error('Error decoding token:', err);
            return; // Si hay un error, terminar la ejecución
        }

        const contactId = contactoPrueba

        console.log(`Consultando mensajes del usuario ${userId} para el contacto ${contactId}`);

        const mensajesUsuarioQuery = db.collection(`mensajes/${userId}/${contactId}`).orderBy("timestamp");
        const mensajesContactoQuery = db.collection(`mensajes/${contactId}/${userId}`).orderBy("timestamp");

        const messageUsuarioSnap = await mensajesUsuarioQuery.get();
        const messageContactoSnap = await mensajesContactoQuery.get();

        let message = [];
        messageUsuarioSnap.forEach(doc => message.push({ id: doc.id, ...doc.data() }));
        messageContactoSnap.forEach(doc => message.push({ id: doc.id, ...doc.data() }));

        message.sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());

        console.log (message);
        socket.emit('chat messages', message, userId);
    

        socket.on('chat message', (message, userId) => {
            console.log(message);
            console.log("userId: " + userId);
    
            // contactoID sera el Id del chat del usuario(tendre su imagen, nombre y el chat en cuestion)
            const contactoId = contactoPrueba
            const usuario = "UsuarioPrueba"
            
            const nuevoMensaje = {
                texto: message,
                usuario: usuario,
                userId: userId, // ID del remitente
                contactoId: contactoId, // ID del destinatario
                image: "Ruta de la imagen",
                timestamp: admin.firestore.FieldValue.serverTimestamp() //Haciendo pruebas
            };

            // Referencia a la colección de mensajes del usuario
            const mensajesCollection = db.collection(`mensajes/${userId}/${contactoId}`);
    
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
