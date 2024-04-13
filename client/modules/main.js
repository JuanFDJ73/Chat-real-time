import { displayMessage, userIdVisibilyOff, switchUserIdVisibility } from '/ui.js';
import { setCookieUser, cleanCookieContact, setContacts } from '/api.js';
import { setupSocketListeners, socket } from '/socket.js';
import { scrollToBottom, handleEscapeKey } from '/utils.js';

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
        const button = document.querySelector('.addContact');
        const modal = document.getElementById('modal');
        const closeButton = document.querySelector('.close-button');
    
        //Prueba: Luego se reestructurara el modal
        button.addEventListener('click', function() {
            modal.style.display = 'flex'; // Cambia de 'none' a 'flex' para mostrar el modal
        });
    
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none'; // Ocultar el modal
        });

        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            console.log('Formulario enviado');
            //NOTA: Hacer Validaciones, posteriormente cerrar el modal
            const input = document.getElementById('formAddContact');
            input.value = ''
            document.getElementById('modal').style.display = 'none'; // Ocultar el modal
        });
        
    
        //Cierra el modal al hacer clic fuera de él
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    });    
}

export { initChatApp };