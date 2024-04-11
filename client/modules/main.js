import { cleanChat, chatOff, cambiarTitulo, changeImgContactHeader, displayMessage, userIdVisibilyOff, switchUserIdVisibility } from '/ui.js';
import { setCookieUser, cleanCookieContact, setContacts } from '/api.js';
import { setupSocketListeners, socket } from '/socket.js';
import { scrollToBottom, cleanSectionChat } from '/utils.js';
import { handleSubmit } from '/forms.js';

function initChatApp() {
    window.onload = function() {
        setCookieUser();
        cleanCookieContact();
        setContacts();
        userIdVisibilyOff()
        // chatOff();
    };

    setupSocketListeners(socket, displayMessage, scrollToBottom);
    handleSubmit(socket);

    if (document.getElementById("back")){
        document.getElementById("back").addEventListener("click", function() {
            cleanCookieContact();
            cleanSectionChat();
            // cleanChat();
            // cambiarTitulo("ChatOp");
            // chatOff();
            // changeImgContactHeader("/static/perfil.png");
        });
    }
    if (document.getElementById("toggleVisibilityButton")){
        document.getElementById("toggleVisibilityButton").addEventListener("click", switchUserIdVisibility);
    }
}

export { initChatApp };