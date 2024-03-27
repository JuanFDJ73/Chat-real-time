import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from "body-parser";


import { Server } from "socket.io";
import { createServer } from "node:http";

//Rutas
import cookieRoutes from "../routes/cookie.routes.js";
import contactsRoutes from "../routes/contacts.routes.js";
import initializeWebSocket from "../database/websocket.js";
import db from "../database/db.js";

dotenv.config();

const port = process.env.PORT || 3000;

// Configuración de CORS
const corsOptions = {
    origin: true,
    credentials: true, // Para permitir cookies
};

const app = express();
app.use(cookieParser());
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {
        timeout: 10000,
        maxAttempts: 10
    }
})

//Ruta de las imagenes estaticas
app.use(express.static('public'));
app.use(logger('dev'))
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
})

initializeWebSocket(io, db);
//Rutas
app.use(cookieRoutes);
app.use(contactsRoutes);
app.use(cors(corsOptions));
app.use(bodyParser.json());

server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})