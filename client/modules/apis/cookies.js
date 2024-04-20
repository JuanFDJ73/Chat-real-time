import { cambiarTitulo } from '../chat/createChat.js';

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
            localStorage.setItem('userId', error.userId);
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