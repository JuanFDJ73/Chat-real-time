import { displayMessage, scrollToBottom } from '/chat/chatInput.js';
import { userIdVisibilyOff, switchUserIdVisibility } from '/sidebar/userIdView.js';
import { setCookieUser, cleanCookieContact } from '/apis/cookies.js';
import { apiSearchContacts } from '/apis/contacts.js';
import { setupSocketListeners, socket } from '/socket/socket.js';
import { handleEscapeKey } from '/utils.js';
import { apiGetUserImage } from './apis/userProfile.js';
import { closeModal, openModal } from './sidebar/options/modal.js';
import { loadUserInfo, modalCroppie } from './sidebar/options/profile.js';

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

    //Abrir modal, Cerrar modal
    document.addEventListener('DOMContentLoaded', function () {
        const button1 = document.querySelector('.userContainer');
        const button2 = document.querySelector('.addContact');
        const button3 = document.querySelector('.optionsContainer');
        const button4 = document.querySelector('.helpContainer');

        button1.addEventListener('click', function () {
            openModal('modal-user');
            modalCroppie()
        });
        document.getElementById('close-button1').addEventListener('click', function () { closeModal('modal-user'); });

        button2.addEventListener('click', function () { openModal('modal-add-contact'); });
        document.getElementById('close-button2').addEventListener('click', function () { closeModal('modal-add-contact'); });

        button3.addEventListener('click', function () { openModal('modal-settings'); });
        document.getElementById('close-button3').addEventListener('click', function () { closeModal('modal-settings'); });

        button4.addEventListener('click', function () { openModal('modal-help'); });
        document.getElementById('close-button4').addEventListener('click', function () { closeModal('modal-help'); });
    });
}

initChatApp();