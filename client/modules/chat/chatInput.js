// formulario
import { apiVerifyUserId, apiVerifyContactId } from '../apis/cookies.js';
export function handleSubmit(socket) {   
    const messageInput = document.getElementById('message');  
    try {
        apiVerifyUserId();
        apiVerifyContactId();

        if (messageInput.value) {
            const userLocal = localStorage.getItem('userId');
            const contactId = localStorage.getItem('contactId');
            // Enviar el mensaje
            const messageData = {
                texto: messageInput.value,
                userId: userLocal,
                contactId: contactId
            };

            console.log('Enviando mensaje:', messageData);
            // Enviamos el mensaje al servidor
            socket.emit('chat message', messageData.texto, messageData.userId, messageData.contactId);
            messageInput.value = '';
            scrollToBottom(); // Aseguramos que el scroll se mueva hacia el último mensaje
        }

    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}
export function displayMessage(message, userId, mensajeId, timestamp) {
    const messageContainer = document.getElementById('message-container');
    console.log ("Pruebas con displayMessage: " + userId)
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.id = mensajeId;
    const userLocal = localStorage.getItem('userId');

    if (userId === userLocal) {
        messageElement.classList.add('message-right');
    } else {
        messageElement.classList.add('message-left');
    }
    messageContainer.insertAdjacentElement('afterBegin', messageElement);
}

// Posible cambio: para guardar el mensaje en un borrador aun cuando cambie de contacto.
export function cleanChat() {
    const messageInput = document.getElementById('message');
    const messageContainer = document.getElementById('message-container');
    if (messageInput){
        messageInput.value = '';
        messageContainer.innerHTML = '';
    }
}

export function scrollToBottom() {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer){
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}