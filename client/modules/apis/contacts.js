import { cleanChat, displayMessage, scrollToBottom } from '../chat/chatInput.js';
import { changeImgContactHeader, changeNameContactHeader } from '../chat/createChat.js';
import { createContactButton } from '../sidebar/button.js';
import { setCookieContact } from './cookies.js';

export function apiFunctionClickContactButton(contactId, img, username) {
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
        changeNameContactHeader(username)
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

export function apiSearchContacts() {
    fetch('/api/searchContacts')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Falló la solicitud al servidor para obtener los contactos.');
    })
    .then(data => {
        if (data && data.length) {
            data.forEach(users => {
                console.log('Users, SearchContacts: ',users);

                createContactButton(users.lastMessage, users.userId, users.contactId, users.usuario);
            });
        } else {
            console.log('No hay contactos disponibles.');
        }
    })
    .catch(error => {
        console.error('Error al recuperar los contactos:', error);
    });
}

export function apiAddContact(contactId) {
    fetch('/api/find-contact', {
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
            console.log('DATA AddContact',data);
            apiFunctionClickContactButton(data.contactId, data.img, data.username);
        } else {
            console.log('No se pudo recuperar el contacto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export async function apiGetContactImage(contactId) {
    return fetch('/api/get-contact-image', {
        method: 'POST',
        body: JSON.stringify({ contactId }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la imagen del usuario');
        }
        return response.json();
    })
    .then(data => {
        console.log('Imagen del usuario:', data.image);
        return data.image;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
