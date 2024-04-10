// formulario
import { apiVerifyUserId, apiVerifyContactId } from '/api.js';
import { scrollToBottom } from '/utils.js';

export function handleSubmit(socket) {
    const form = document.getElementById('form');
    const messageInput = document.getElementById('message');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        try {
            apiVerifyUserId();
            apiVerifyContactId();

            if (messageInput.value) {
                const userLocal = localStorage.getItem('userId');
                const contactId = localStorage.getItem('contactId');
                console.log("SUBMIT prueba");
                console.log(userLocal.userId);
                console.log(contactId);
                // Enviar el mensaje
                const messageData = {
                    texto: messageInput.value,
                    userId: userLocal.userId,
                    contactId: contactId.contactId
                };

                console.log('Enviando mensaje:', messageData);
                // Enviamos el mensaje al servidor
                await socket.emit('chat message', messageData.texto, messageData.userId, messageData.contactId);
                messageInput.value = '';
                scrollToBottom(); // Aseguramos que el scroll se mueva hacia el último mensaje
            }

        } catch (error) {
            console.error('Ocurrió un error:', error);
        }
    });
}

