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
io.on('connection', (socket) => {
    /////////////////////////////////////////////
    // Realizar el guardado en el localStorage //
    /////////////////////////////////////////////
    console.log('a user has connected')

    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })

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
            //Sacar la imagen del Id del contacto
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
        io.emit('chat message', message);
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