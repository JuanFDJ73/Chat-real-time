import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

import { Server } from "socket.io";
import { createServer } from "node:http";

// Rutas
import routes from "../routes/All.routes.js"
import initializeWebSocket from "../database/websocket.js";
import { db } from "../database/db.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {
        timeout: 10000,
        maxAttempts: 10
    }
});

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger('dev'));

// Rutas public
app.use(express.static('public'));
app.use(express.static('client/modules'));
app.use(express.static('client/styles'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

// Inicialización de WebSocket
initializeWebSocket(io, db);

// Rutas
app.use(routes);

// Escucha del servidor
server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
