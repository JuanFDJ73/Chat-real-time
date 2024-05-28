import { displayMessage, scrollToBottom } from '/chat/chatInput.js';
import { userIdVisibilyOff, switchUserIdVisibility } from '/sidebar/userIdView.js';
import { setCookieUser, cleanCookieContact } from '/apis/cookies.js';
import { setupSocketListeners, socket } from '/socket/socket.js';
import { handleEscapeKey } from '/utils.js';
import { closeModal, openModal } from '/sidebar/options/modal.js';
import { loadUserInfo } from '/sidebar/options/profile.js';
import { setupAddContactForm } from '/sidebar/options/addContact.js';

function initChatApp() {
    window.onload = function () {
        setCookieUser();
        cleanCookieContact();  
        userIdVisibilyOff();
        loadUserInfo();
    };

    setupSocketListeners(socket, displayMessage, scrollToBottom);

    document.getElementById("toggleVisibilityButton").addEventListener("click", switchUserIdVisibility);

    //Cerrar chat, con boton escape
    document.addEventListener('keydown', handleEscapeKey);

    const buttons = {
        imageUser: document.querySelector('.userContainer'),
        addContact: document.querySelector('.addContact'),
        options: document.querySelector('.optionsContainer'),
        help: document.querySelector('.helpContainer')
    };

    const modals = {
        imageUser: document.getElementById('modal-user'),
        addContact: document.getElementById('modal-add-contact'),
        options: document.getElementById('modal-settings'),
        help: document.getElementById('modal-help')
    };

    //Abrir modal
    Object.keys(buttons).forEach(key => {
        buttons[key].addEventListener('click', () => openModal(modals[key]));
    });

    //Cerrar modal
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    setupAddContactForm();
}

initChatApp();