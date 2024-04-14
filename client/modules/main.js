import { displayMessage, userIdVisibilyOff, switchUserIdVisibility } from '/ui.js';
import { setCookieUser, cleanCookieContact, setContacts } from '/api.js';
import { setupSocketListeners, socket } from '/socket.js';
import { scrollToBottom, handleEscapeKey } from '/utils.js';
import { createModalStructure, createFormAddContact, removeModal} from './forms.js';

function initChatApp() {
    window.onload = function() {
        setCookieUser();
        cleanCookieContact();
        setContacts();
        userIdVisibilyOff()
    };

    setupSocketListeners(socket, displayMessage, scrollToBottom);

    if (document.getElementById("toggleVisibilityButton")){
        document.getElementById("toggleVisibilityButton").addEventListener("click", switchUserIdVisibility);
    }
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('DOMContentLoaded', function() {
        const button1 = document.querySelector('.userContainer');
        const button2 = document.querySelector('.addContact');
        const button3 = document.querySelector('.optionsContainer');
        const button4 = document.querySelector('.helpContainer');
    
        button1.addEventListener('click', function() {
            const className = "modal-content modal-user"
            const title = "Perfil"
            createModalStructure(className, title);
        });

        button2.addEventListener('click', function() {
            const className = "modal-content modal-add-contact"
            const title = "Agregar Contacto"
            createModalStructure(className, title);
            createFormAddContact();
        });

        button3.addEventListener('click', function() {
            const className = "modal-content modal-settings"
            const title = "Configuraciones"
            createModalStructure(className, title);
            createFormAddContact();
        });

        button4.addEventListener('click', function() {
            const className = "modal-content modal-help"
            const title = "Ayuda"
            createModalStructure(className, title);
            createFormAddContact();
        });
        
    });    
}

export { initChatApp };