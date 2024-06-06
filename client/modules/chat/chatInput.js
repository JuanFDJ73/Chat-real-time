// formulario
export function handleSubmit(socket) {
    const messageInput = document.getElementById('message');
    try {

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
//Falta: Colocar el timestamp del mensaje
export function displayMessage(message, mensajeId, emisor, receptor, timestamp) {
    const messageContainer = document.getElementById('message-container');

    const messageElement = document.createElement('div');
    messageElement.id = mensajeId;

    const optionsButton = document.createElement('button');
    optionsButton.classList.add('message-options');
    optionsButton.innerHTML = '⋮';

    const messageContent = document.createElement('div');
    messageContent.textContent = message;

    const userLocal = localStorage.getItem('userId');
    const contactLocal = localStorage.getItem('contactId');
    console.log("Prueba Display", emisor, userLocal, contactLocal);
    if (emisor === userLocal) {
        messageElement.classList.add('message-right');
        messageContent.classList.add('message-content-right');
    } else {
        messageElement.classList.add('message-left');
        messageContent.classList.add('message-content-left');
    }

    messageElement.appendChild(optionsButton);
    messageElement.appendChild(messageContent);

    messageContainer.insertAdjacentElement('afterBegin', messageElement);
}


// Posible cambio: para guardar el mensaje en un borrador aun cuando cambie de contacto.
export function cleanChat() {
    const messageInput = document.getElementById('message');
    const messageContainer = document.getElementById('message-container');
    if (messageInput) {
        messageInput.value = '';
        messageContainer.innerHTML = '';
    }
}

export function scrollToBottom() {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}

function optionMessage() {

}