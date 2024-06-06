import { cleanChat, displayMessage, scrollToBottom } from '../chat/chatInput.js';
import { changeImgContactHeader, changeNameContactHeader, createChatSection } from '../chat/createChat.js';
import { createContactButton } from '../sidebar/button.js';
import { apiVerifyUserId, setCookieContact } from './cookies.js';

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
            apiVerifyUserId();
            // Iterar a través de cada mensaje y mostrarlo
            messages.forEach(message => {
                console.log('MENSAJE: ', message)
                displayMessage(message.texto, message.id, message.emisor, message.receptor, message.timestamp);

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
                    console.log('Users, SearchContacts: ', users);

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

export async function apiAddContact(contactId) {
    try {
        const response = await fetch('/api/find-contact', {
            method: 'POST',
            body: JSON.stringify({ contactId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Network response was not ok');
        }

        const data = await response.json();

        if (data && !data.error) {
            createChatSection();
            apiFunctionClickContactButton(data.contactId, data.img, data.username);
            return { status: 'success', message: 'Contacto agregado con éxito' };
        } else {
            return { status: 'error', message: 'El usuario no existe' };
        }
    } catch (error) {
        console.error('Error:', error);
        return { status: 'error', message: error.message || 'Este usuario no existe' };
    }
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
