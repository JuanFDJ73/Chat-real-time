import express from "express";
import logger from "morgan";

import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT || 3000;

const app = express()
const server = createServer(app);
const io = new Server(server)

//Ruta de las imagenes estaticas
app.use(express.static('public'));

//Conexion con el websocket
io.on('connection', (socket) => {
    console.log('a user has connected')

    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })

    socket.on('chat message', (message) => {
        io.emit('chat message', message)
    })
    
});


app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})