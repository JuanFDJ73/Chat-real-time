import { cleanChat, chatOn, cambiarTitulo, changeImgContactHeader, displayMessage} from '/ui.js';
import { scrollToBottom } from '/utils.js';

// Funciones para interactuar con la API.
export function setCookieUser() {
    fetch('/api/set-user-id')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error al recibir el userId');
        })
        .then(data => {
            localStorage.setItem('userId', data.userId);
            console.log('UserId guardado en localStorage:', data.userId);
            console.log("La cookie ha sido establecida por el servidor");
        })
        .catch(error => {
            console.error('Error al establecer la cookie: ', error);
        });
}

export function cleanCookieContact() {
    fetch('/api/delete-cookie-contact')
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('contactId');
                console.log("La cookie ha sido eliminada por el servidor");
            } else {
                console.error('No se pudo eliminar la cookie');
            }
        })
        .catch(error => {
            console.error('Error al eliminar la cookie:', error);
        });
}

export function apiVerifyUserId() {
    fetch('/api/verify-user-id')
        .then(response =>{
            if (response.ok) {
                return response.json(); 
            }
            throw new Error('Error al recibir el userId');
        })
        .then(data => {
            localStorage.setItem('userId', data.userId);
            console.log('UserId guardado en localStorage:', data.userId);
        })
}

export function apiVerifyContactId() {
    fetch('/api/verify-contact-id')
        .then(response =>{
            if (response.ok) {
                return response.json(); 
            }
            throw new Error('Error al recibir el userId');
        })
        .then(data => {
            localStorage.setItem('contactId', data.contactId);
            console.log('contactId guardado en localStorage:', data.contactId);
        })
}

export function setCookieContact(contactId) {
    fetch('/api/set-contact-id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contactId: contactId
        })
    })
   .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al recibir el contactId');
   })
   .then (data => {
        localStorage.setItem('contactId', data.contactId);
        cambiarTitulo(data.contactId);
        console.log('ContactId guardado en localStorage:', data.contactId);
        console.log("La cookie ha sido establecida (contacId)")
    })
}

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
            console.log(message);
            
            chatOn()
            displayMessage(message.texto, message.userId);
            scrollToBottom();
            
        });
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
            data.forEach(contactId => {
                const button = document.createElement('button');
                button.classList.add('contacts-menu');

                // Crear imagen
                const img = document.createElement('img');
                img.src = '/image/icon-man.png';
                img.alt = `img ${contactId}`;
                img.classList.add('contact-image'); //Revisar

                // Crear div para el texto
                const textDiv = document.createElement('div');
                textDiv.classList.add('contact-info');

                // Crear Nombre del contacto
                const titleSpan = document.createElement('div');
                titleSpan.textContent = contactId; // Usar contactId como título, se cambiara por el nobmre que asigne el usuario
                titleSpan.classList.add('contact-title');

                // Crear ultimo chat
                const chatSpan = document.createElement('div');
                chatSpan.textContent = 'ultimo mensaje ejemplo largo'; //ultimo mensaje
                chatSpan.classList.add('last-message');

                // Agregar imagen y texto al botón
                textDiv.appendChild(titleSpan);
                textDiv.appendChild(chatSpan);
                button.appendChild(img);
                button.appendChild(textDiv);

                button.addEventListener('click', function() {
                    contactButton(contactId, img.src);
                });
                document.getElementById('contacts').appendChild(button);
            });
        } else {
            console.log('No hay contactos disponibles.');
        }
    })
    .catch(error => {
        console.error('Error al recuperar los contactos:', error);
    });
}