import express from "express";
import logger from "morgan";
import dotenv from "dotenv";

import { Server } from "socket.io";
import { createServer } from "node:http";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const port = process.env.PORT || 3000;

const app = express()
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {
        timeout: 10000,
        maxAttempts: 10
    }
})

dotenv.config();

//Ruta de las imagenes estaticas
app.use(express.static('public'));

//Conexion con el websocket
io.on('connection', async (socket) => {
    console.log('a user has connected')

    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })
    
    // Recuperar mensajes del usuario desde Firestore
    // const userId = localStorage.getItem('UserId');
    const userId = "userIdprueba";
    const contactoId = "contactoId";

    const mensajesCollection1 = collection(db, `mensajes/${userId}/${contactoId}`);
    const mensajesCollection2 = collection(db, `mensajes/${contactoId}/${userId}`);
    
    const querySnapshot1 = await getDocs(mensajesCollection1);
    const querySnapshot2 = await getDocs(mensajesCollection2);
    
    // Extraer los mensajes de ambas colecciones
    const mensajes1 = querySnapshot1.docs.map(doc => ({...doc.data(), collection: 'mensajesCollection1'}));
    const mensajes2 = querySnapshot2.docs.map(doc => ({...doc.data(), collection: 'mensajesCollection2'}));
    
    // Combinar los mensajes en un solo array
    const mensajesCombinados = [...mensajes1, ...mensajes2];
    
    // Ordenar los mensajes combinados por fecha
    const mensajesOrdenados = mensajesCombinados.sort((a, b) => a.timestamp - b.timestamp);
    
    // Enviar los mensajes ordenados al cliente
    mensajesOrdenados.forEach(mensaje => {
        socket.emit('chat message', mensaje.texto, mensaje.userId);
    });


    socket.on('chat message', (message, userId) => {
        console.log(message);
        console.log("userId: " + userId);

        // contactoID sera el Id del chat del usuario(tendre su imagen, nombre y el chat en cuestion)
        const contactoId = "contactoId";
        const usuario = "UsuarioPrueba"
        // Guardar el mensaje en Firestore (Estructura: mensajes/usuario/contacto)
        const mensajesCollection = collection(db, `mensajes/${userId}/${contactoId}`);
    
        const nuevoMensaje = {
            texto: message,
            usuario: usuario,
            userId: userId, // ID del remitente
            contactoId: contactoId, // ID del destinatario
            image: "Ruta de la imagen",
            timestamp: new Date()
        };        
    
        addDoc(mensajesCollection, nuevoMensaje)
            .then((docRef) => {
                console.log('Mensaje guardado en Firestore con ID: ', docRef.id);
            })
            .catch((error) => {
                console.error('Error al guardar mensaje en Firestore: ', error);
            });
        // Emitir el mensaje a todos los usuarios conectados
        io.emit('chat message', message, userId);
    });

});

app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
})

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);


server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})