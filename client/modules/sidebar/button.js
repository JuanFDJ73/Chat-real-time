import { falseLoading } from '../utils.js';
import { createChatSection } from '../chat/createChat.js';
import { contactButton } from '/apis/contacts.js';

//El userId posteriormente se usara mostrar el simbolo del enviado (si fue el ultimo mensaje)
export function  createButton(message, userId, contactId) {
    const button = document.createElement('button');
    button.classList.add('contacts-menu');
    button.id = contactId;

    // Crear imagen
    const img = document.createElement('img');
    img.id = `image-${contactId}`;
    img.src = '/image/icon-man.png';
    img.alt = `img ${contactId}`;
    img.classList.add('contact-image'); //Revisar

    // Crear div para el texto
    const textDiv = document.createElement('div');
    textDiv.classList.add('contact-info');

    // Crear Nombre del contacto
    const titleSpan = document.createElement('div');
    titleSpan.textContent = contactId;
    titleSpan.classList.add('contact-title');

    // Crear ultimo chat
    const chatSpan = document.createElement('div');
    chatSpan.textContent = message.texto; //ultimo mensaje
    chatSpan.classList.add('last-message');
    chatSpan.id = `message-${contactId}`;

    // Agregar imagen y texto al botón
    textDiv.appendChild(titleSpan);
    textDiv.appendChild(chatSpan);
    button.appendChild(img);
    button.appendChild(textDiv);

    button.addEventListener('click', function() {
        createChatSection();
        removeButtonClicked(button)
        button.classList.add('clicked');
        falseLoading(contactId);
        contactButton(contactId, img.src);
    });
    document.getElementById('contacts').appendChild(button);
}

// export function getImage (contactId){
//     //Posible api?
// }

export function updateContactButtons(message, contactId) {
    const lastMessage = document.getElementById(`message-${contactId}`);
    lastMessage.textContent = message
}

export function removeButtonActive() {
    const buttons = document.querySelectorAll('.contacts-menu');
    
    buttons.forEach(button => {
        button.classList.remove('clicked');
    });
}

export function removeButtonClicked(button) {
    const buttons = document.querySelectorAll('.contacts-menu');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase 'clicked' de todos los botones
            buttons.forEach(btn => btn.classList.remove('clicked'));
            
            // Agregar la clase 'clicked' al botón actual
            this.classList.add('clicked');
        });
    });
}
