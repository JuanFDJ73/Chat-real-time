import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
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
        ///////////////////////////////////
        // const contactoId = "contactoId";
        ///////////////////////////////////
        // const contactoId = contactoPrueba
        // const mensajesCollection1 = collection(db, `mensajes/${userId}/${contactoId}`);
        // const mensajesCollection2 = collection(db, `mensajes/${contactoId}/${userId}`);
    
        // const querySnapshot1 = await getDocs(mensajesCollection1);
        // const querySnapshot2 = await getDocs(mensajesCollection2);
    
        // // Extraer los mensajes de ambas colecciones
        // const mensajes1 = querySnapshot1.docs.map(doc => ({ ...doc.data(), collection: 'mensajesCollection1' }));
        // const mensajes2 = querySnapshot2.docs.map(doc => ({ ...doc.data(), collection: 'mensajesCollection2' }));
    
        // // Combinar los mensajes en un solo array
        // const mensajesCombinados = [...mensajes1, ...mensajes2];
    
        // // Ordenar los mensajes combinados por fecha
        // const mensajesOrdenados = mensajesCombinados.sort((a, b) => a.timestamp - b.timestamp);
    
        // // Enviar los mensajes ordenados al cliente
        // mensajesOrdenados.forEach(mensaje => {
        //     socket.emit('chat message', mensaje.texto, mensaje.userId);
        // });
    
    
        socket.on('chat message', (message, userId) => {
            console.log(message);
            console.log("userId: " + userId);
    
            // contactoID sera el Id del chat del usuario(tendre su imagen, nombre y el chat en cuestion)
            ///////////////////////////////////
            // const contactoId = "contactoId";
            ///////////////////////////////////
            const contactoId = contactoPrueba
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
    
            const mensajeDoc = doc(mensajesCollection);
            setDoc(mensajeDoc, nuevoMensaje)
                .then(() => {
                    console.log('Mensaje guardado en Firestore');
                })
                .catch((error) => {
                    console.error('Error al guardar mensaje en Firestore: ', error);
                });
            // Emitir el mensaje a todos los usuarios conectados
            io.emit('chat message', message, userId);
        });
    
    });
}
