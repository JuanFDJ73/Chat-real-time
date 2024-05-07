import { cleanCookieContact } from '../apis/cookies.js';
import { removeButtonActive } from '../sidebar/button.js';
import { socket } from '../socket/socket.js';
import { handleSubmit } from './chatInput.js';

function createChatSection() {
    // Busca el elemento <section> con el id="chat"
    const chatSection = document.getElementById('chat');

    //Verifica que este vacio.
    if (chatSection.children.length === 0) {
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
        backButton.addEventListener('click', function () {
            cleanCookieContact();
            cleanSectionChat();
            removeButtonActive();
        });

        const iconContainerDiv = document.createElement('div');
        iconContainerDiv.id = 'icon-container';
        iconContainerDiv.classList.add('icon');
        const iconImage = document.createElement('img');
        iconImage.src = '/static/perfil.png';
        iconContainerDiv.addEventListener('click', function() {
            openImageModal(iconImage.src);
        });
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

        form.addEventListener('submit', function (e) {
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

function cambiarTitulo(titulo) {
    const nombreContactDiv = document.getElementById('nombre-contact');
    if (nombreContactDiv) {
        const h1 = nombreContactDiv.querySelector('h1');
        h1.textContent = titulo;
    }
}

function changeImgContactHeader(newImage) {
    const imageElement = document.querySelector('#icon-container img');
    if (imageElement && newImage != "") {
        // Cambia el atributo 'src' de la imagen al nuevo
        imageElement.src = newImage;
    } else {
        imageElement.src = "/static/perfil.png";
    }
}

function changeNameContactHeader(username) {
    const div = document.getElementById('nombre-contact');
    const h1 = div.querySelector('h1');
    h1.textContent = username;
}
function cleanSectionChat() {
    const chatSection = document.getElementById('chat');
    chatSection.innerHTML = ''; // Limpiamos el contenido existente
}

function openImageModal(img) {
    const modal = document.createElement('div');
    modal.classList.add('modal-img-contact');
    modal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });

    const modalImg = document.createElement('img');
    modalImg.classList.add('modal-img-contact-content');
    modalImg.src = img;
    
    modalImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    modal.appendChild(modalImg);
    document.body.appendChild(modal);
}

export {
    changeImgContactHeader,
    cambiarTitulo,
    cleanSectionChat,
    createChatSection,
    changeNameContactHeader
}