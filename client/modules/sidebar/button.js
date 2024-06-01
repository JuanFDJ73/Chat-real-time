import { falseLoading } from '../utils.js';
import { createChatSection } from '../chat/createChat.js';
import { apiGetContactImage, apiFunctionClickContactButton } from '../apis/contacts.js';
import { apiGetNick } from '../apis/contactProfile.js';
import { apiVerifyContactId, apiVerifyUserId } from '../apis/cookies.js';

//El userId posteriormente se usara mostrar el simbolo del enviado (si fue el ultimo mensaje)
async function createContactButton(message, emisor, receptor, usuario) {
    await apiVerifyUserId()
    const userLocal = localStorage.getItem('userId');

    let contactId
    if (emisor === userLocal){
        contactId = receptor
    } else {
        contactId = emisor
    }
    
    const button = document.createElement('button');
    button.classList.add('contacts-menu');
    button.id = contactId;


    
    // Crear imagen
    const img = document.createElement('img');
    img.id = `image-${contactId}`;
    img.src = await apiGetContactImage(contactId);
    img.alt = `img ${contactId}`;
    img.classList.add('contact-image');

    // Crear div para el texto
    const textDiv = document.createElement('div');
    textDiv.classList.add('contact-info');

    // Crear Nombre del contacto
    const titleSpan = document.createElement('div');
    titleSpan.textContent = usuario || contactId;
    titleSpan.classList.add('contact-title');

    // Crear div para el último chat y el icono de visto
    const contactLastMessageDiv = document.createElement('div');
    contactLastMessageDiv.classList.add('contact-last-message');
    contactLastMessageDiv.id = `message-${contactId}`;

    // Crear div para el icono de visto
    const viewDiv = document.createElement('div');
    viewDiv.classList.add('view');
    viewDiv.id = `view-${contactId}`;
    const viewImg = document.createElement('img');

    if (emisor === userLocal) {
        viewImg.src = '/static/enviado.png';
        showView(viewDiv)
    } else {
        viewImg.src = '/static/comunicado.png';
        hiddenView(viewDiv)
    }
    viewImg.alt = 'visto';

    viewDiv.appendChild(viewImg);

    // Crear último mensaje
    const lastMessageDiv = document.createElement('div');
    lastMessageDiv.classList.add('last-message');
    lastMessageDiv.textContent = message.texto || message;

    // Agregar el icono de visto y el último mensaje al contenedor de último chat
    contactLastMessageDiv.appendChild(viewDiv);
    contactLastMessageDiv.appendChild(lastMessageDiv);

    // Agregar nombre del contacto y último chat al contenedor de texto
    textDiv.appendChild(titleSpan);
    textDiv.appendChild(contactLastMessageDiv);

    // Agregar imagen y contenedor de texto al botón
    button.appendChild(img);
    button.appendChild(textDiv);

    button.addEventListener('click', function () {
        createChatSection();
        removeButtonClicked(button);
        button.classList.add('clicked');
        falseLoading(contactId);
        apiFunctionClickContactButton(contactId, img.src);
    });

    document.getElementById('contacts').appendChild(button);
}


async function updateContactButtons(message, emisor, receptor) {
    await apiVerifyUserId();
    const userLocal = localStorage.getItem('userId');

    // Verificar si el mensaje es del usuario local o de un contacto
    if (userLocal === emisor) {
        // Mensaje del usuario local
        const lastMessage = document.getElementById(`message-${receptor}`);
        if (lastMessage) {
            lastMessage.textContent = message;
        }
        const parentView = document.getElementById(`view-${receptor}`);
        if (parentView) {
            const imgElement = parentView.querySelector('img');
            if (imgElement) {
                imgElement.src = '/static/enviado.png';
            }
            console.log('1UserId', emisor, " UserLocal", userLocal);
            showView(parentView);
        }
    } else {
        // Mensaje del contacto
        const lastMessage = document.getElementById(`message-${emisor}`);
        if (lastMessage) {
            lastMessage.textContent = message;
        }
        const parentView = document.getElementById(`view-${emisor}`);
        if (parentView) {
            const imgElement = parentView.querySelector('img');
            if (imgElement) {
                imgElement.src = '/static/comunicado.png';
            }
            console.log('2UserId', emisor, " UserLocal", userLocal);
            hiddenView(parentView);
        }
    }

    // Manejar la ausencia de lastMessage
    if (!lastMessage) {
        const usuario = await apiGetNick(receptor);
        createContactButton(message, emisor, receptor, usuario);
    }
}



function removeButtonActive() {
    const buttons = document.querySelectorAll('.contacts-menu');

    buttons.forEach(button => {
        button.classList.remove('clicked');
    });
}

function removeButtonClicked(button) {
    const buttons = document.querySelectorAll('.contacts-menu');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Remover la clase 'clicked' de todos los botones
            buttons.forEach(btn => btn.classList.remove('clicked'));

            // Agregar la clase 'clicked' al botón actual
            this.classList.add('clicked');
        });
    });
}

function hiddenView(viewDiv) {
    viewDiv.classList.add('hidden-view');
}

function showView(viewDiv) {
    viewDiv.classList.remove('hidden-view');
}

export {
    createContactButton,
    updateContactButtons,
    removeButtonActive,
    removeButtonClicked,
    hiddenView,
    showView,
}