import { falseLoading, createChatSection} from '/ui.js';
import { removeButtonClicked } from '/utils.js';

export function  createButton(contactId) {
    const button = document.createElement('button');
    button.classList.add('contacts-menu');
    button.id = contactId;

    // Crear imagen
    const img = document.createElement('img');
    img.src = '/image/icon-man.png';
    img.alt = `img ${contactId}`;
    img.classList.add('contact-image'); //Revisar

    // Crear div para el texto
    const textDiv = document.createElement('div');
    textDiv.classList.add('contact-info');

    // Crear Nombre del contacto
    const titleSpan = document.createElement('div');
    titleSpan.textContent = contactId; // Usar contactId como título, se cambiara por el nobmre que asigne el usuario
    titleSpan.classList.add('contact-title');

    // Crear ultimo chat
    const chatSpan = document.createElement('div');
    chatSpan.textContent = 'ultimo mensaje ejemplo largo'; //ultimo mensaje
    chatSpan.classList.add('last-message');

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

export function getImage (contactId){
    //Posible api?
}