// Configuración y manejo de eventos de Socket.io.
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { updateContactButtons } from "../sidebar/button.js";
export const socket = io();

export function setupSocketListeners(socket, displayMessage, scrollToBottom) {
    socket.on('chat message', (message, userId, contacId, mensajeId) => {
        displayMessage(message, userId, mensajeId);
        scrollToBottom();
        updateContactButtons(message, contacId);
    });
}
