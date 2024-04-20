// Funciones de utilidad
import { cleanCookieContact } from "/apis/cookies.js";
import { cleanSectionChat } from "/chat/createChat.js";
import { removeButtonActive } from "/sidebar/button.js";

export function falseLoading(contactId) {
    if (contactId != localStorage.getItem('contactId')) {
        createSpinner();
        const spinnerContainer = document.getElementById('spinnerContainer');
        spinnerContainer.style.display = 'flex'; // Mostrar el spinner
    
        setTimeout(function() {
            spinnerContainer.style.display = 'none'; // Ocultar el spinner después de 1 segundo
        }, 1000); // 1000 milisegundos = 1 segundo
    }
}

export function createSpinner() {
    const spinnerContainer = document.createElement('div');
    spinnerContainer.id = 'spinnerContainer';
    spinnerContainer.classList.add('spinner-container');

    // Crear el div del spinner
    const spinner = document.createElement('div');
    spinner.id = 'spinner';
    spinner.classList.add('spinner');
    spinnerContainer.appendChild(spinner);

    // Añadir el contenedor del spinner al final del div 'message-container'
    const messageContainer = document.getElementById('message-container');
    messageContainer.appendChild(spinnerContainer);
}

export function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        cleanCookieContact();
        cleanSectionChat();
        removeButtonActive();
    }
}