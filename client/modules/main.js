import { displayMessage, scrollToBottom } from '/chat/chatInput.js';
import { userIdVisibilyOff, switchUserIdVisibility} from '/sidebar/userIdView.js';
import { setCookieUser, cleanCookieContact} from '/apis/cookies.js';
import { apiSearchContacts } from '/apis/contacts.js';
import { setupSocketListeners, socket} from '/socket/socket.js';
import { handleEscapeKey } from '/utils.js';
import { createModalStructure } from '/sidebar/options/modalStructure.js';
import { createFormAddContact } from '/sidebar/options/addContact.js';
import { createFormProfile } from './sidebar/options/profile.js';
import { apiGetUserImage } from './apis/userProfile.js';
function initChatApp() {
    window.onload = function() {
        setCookieUser();
        cleanCookieContact();
        apiSearchContacts();
        userIdVisibilyOff()
        apiGetUserImage();
    };

    setupSocketListeners(socket, displayMessage, scrollToBottom);

    document.getElementById("toggleVisibilityButton").addEventListener("click", switchUserIdVisibility);
    
    //Cerrar chat, con boton escape
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
            createFormProfile();
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

        });

        button4.addEventListener('click', function() {
            const className = "modal-content modal-help"
            const title = "Ayuda"
            createModalStructure(className, title);
        });
        
    });    
}

export { initChatApp };