import { cleanChat, displayMessage, scrollToBottom } from '../chat/chatInput.js';
import { changeImgContactHeader } from '../chat/createChat.js';
import { createButton } from '../sidebar/button.js';
import { setCookieContact } from './cookies.js';

export function contactButton(contactId, img) {
    fetch('/api/contact-button', {
        method: 'POST',
        body: JSON.stringify({ contactId }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(messages => {
        cleanChat();
        setCookieContact(contactId)
        changeImgContactHeader(img)
        // Iterar a través de cada mensaje y mostrarlo
        messages.forEach(message => {
            console.log('MENSAJE: ',message)
            displayMessage(message.texto, message.emisor, message.id, message.timestamp);
            
        });
        scrollToBottom();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export function setContacts() {
    fetch('/api/contacts')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Falló la solicitud al servidor para obtener los contactos.');
    })
    .then(data => {
        if (data && data.length) {
            data.forEach(users => {
                createButton(users.lastMessage, users.userId, users.contactId);
            });
        } else {
            console.log('No hay contactos disponibles.');
        }
    })
    .catch(error => {
        console.error('Error al recuperar los contactos:', error);
    });
}

export function reviewContact(contactId) {
    fetch('/api/review-contact', {
        method: 'POST',
        body: JSON.stringify({ contactId }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data) {
            contactButton(data.contactId, data.img);
        } else {
            console.log('No se pudo recuperar el contacto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}