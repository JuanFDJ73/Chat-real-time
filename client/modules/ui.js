import { cleanCookieContact } from './api.js';
import { socket } from '/socket.js';
import { hiddenWords , createSpinner, cleanSectionChat} from '/utils.js';
import { handleSubmit } from './forms.js';
// Gestión de elementos de la interfaz de usuario y eventos.
export function cleanChat() {
    const messageInput = document.getElementById('message');
    const messageContainer = document.getElementById('message-container');
    messageInput.value = '';
    messageContainer.innerHTML = '';
}

export function chatOn() {
    const form = document.getElementById('form');
    const input = form.querySelector("input");
    const button = form.querySelector("button");
    input.disabled = false;
    button.disabled = false;
}

export function chatOff() {
    const form = document.getElementById('form');
    const input = form.querySelector("input");
    const button = form.querySelector("button");
    input.disabled = true;
    button.disabled = true;
}
export function cambiarTitulo(titulo) {
    const nombreContactDiv = document.getElementById('nombre-contact');
    const h1 = nombreContactDiv.querySelector('h1');
    h1.textContent = titulo;
}

export function changeImgContactHeader(newImage) {
    const imageElement = document.querySelector('#icon-container img');
    if(imageElement) {
        // Cambia el atributo 'src' de la imagen al nuevo
        imageElement.src = newImage;
    } else {
        console.log('El elemento imagen no se encontró.');
    }
}

export function displayMessage(message, userId) {
    const messageContainer = document.getElementById('message-container');
    console.log ("Pruebas con displayMessage: " + userId)
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    const userLocal = localStorage.getItem('userId');

    if (userId === userLocal) {
        messageElement.classList.add('message-right');
    } else {
        messageElement.classList.add('message-left');
    }
    messageContainer.insertAdjacentElement('afterBegin', messageElement);
}

export function userIdVisibilyOff(){
    const userLocal = localStorage.getItem('userId');
    const userIdContent = document.getElementById("userIdContent");
    //Asegurar que este oculto el UserID
    userIdContent.textContent = `UserId: ${hiddenWords(userLocal)}`;
}; 

export function switchUserIdVisibility() {
    const userLocal = localStorage.getItem('userId');
    const userIdContent = document.getElementById("userIdContent");

    if (userIdContent.dataset.visible === "true") {
        // Ocultar contenido
        userIdContent.textContent = `UserId: ${hiddenWords(userLocal)}`;
        userIdContent.dataset.visible = "false";
    } else {
        // Mostrar contenido
        userIdContent.textContent = `UserId: ${userLocal}`;
        userIdContent.dataset.visible = "true";
    }
}

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

export function createChatSection() {
    // Busca el elemento <section> con el id="chat"
    const chatSection = document.getElementById('chat');

    //Verifica que este vacio.
    if (chatSection.children.length === 0){
        // Crear el div con id="contact-container" y sus elementos hijos
        const contactContainerDiv = document.createElement('div');
        contactContainerDiv.id = 'contact-container';
        contactContainerDiv.classList.add('contact-container');
    
        const backButton = document.createElement('button');
        backButton.id = 'back';
        backButton.classList.add('back');
        const backImage = document.createElement('img');
        backImage.src = '/static/back.png';
        backButton.appendChild(backImage);
        backButton.addEventListener('click', function() {
            cleanCookieContact();
            cleanSectionChat();
        });

        const iconContainerDiv = document.createElement('div');
        iconContainerDiv.id = 'icon-container';
        iconContainerDiv.classList.add('icon');
        const iconImage = document.createElement('img');
        iconImage.src = '/static/perfil.png';
        iconContainerDiv.appendChild(iconImage);
    
        const nombreContactDiv = document.createElement('div');
        nombreContactDiv.id = 'nombre-contact';
        nombreContactDiv.classList.add('nombre-contact');
        const h1 = document.createElement('h1');
        h1.textContent = '';
        nombreContactDiv.appendChild(h1);
    
        // Agregar los elementos hijos al contactContainerDiv
        contactContainerDiv.appendChild(backButton);
        contactContainerDiv.appendChild(iconContainerDiv);
        contactContainerDiv.appendChild(nombreContactDiv);
    
        // Crear el div con id="message-container"
        const messageContainerDiv = document.createElement('div');
        messageContainerDiv.id = 'message-container';
        messageContainerDiv.classList.add('message-container');
        // Agregar el falso loading aquí
        const spinnerContainerDiv = document.createElement('div');
        spinnerContainerDiv.id = 'spinnerContainer';
        spinnerContainerDiv.classList.add('spinner-container');
        const spinnerDiv = document.createElement('div');
        spinnerDiv.id = 'spinner';
        spinnerDiv.classList.add('spinner');
        spinnerContainerDiv.appendChild(spinnerDiv);
        messageContainerDiv.appendChild(spinnerContainerDiv);
    
        // Crear el formulario con id="form" y sus elementos hijos
        const form = document.createElement('form');
        form.id = 'form';
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'message';
        input.id = 'message';
        input.placeholder = 'Escribe un mensaje';
        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = 'Enviar';
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSubmit(socket);
        });
        
        form.appendChild(input);
        form.appendChild(button);
    
        // Agregar los elementos al chatSection
        chatSection.appendChild(contactContainerDiv);
        chatSection.appendChild(messageContainerDiv);
        chatSection.appendChild(form);
    
        // Devolver el chatSection
        return chatSection;
    }
}


