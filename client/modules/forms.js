// formulario
import { apiVerifyUserId, apiVerifyContactId, reviewContact} from '/api.js';
import { scrollToBottom } from '/utils.js';

export function handleSubmit(socket) {   
    const messageInput = document.getElementById('message');  
    try {
        apiVerifyUserId();
        apiVerifyContactId();

        if (messageInput.value) {
            const userLocal = localStorage.getItem('userId');
            const contactId = localStorage.getItem('contactId');
            // Enviar el mensaje
            const messageData = {
                texto: messageInput.value,
                userId: userLocal,
                contactId: contactId
            };

            console.log('Enviando mensaje:', messageData);
            // Enviamos el mensaje al servidor
            socket.emit('chat message', messageData.texto, messageData.userId, messageData.contactId);
            messageInput.value = '';
            scrollToBottom(); // Aseguramos que el scroll se mueva hacia el último mensaje
        }

    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}

export function createModalStructure(className, title) {
    // Crear el div del modal
    const modalDiv = document.createElement('div');
    modalDiv.id = 'modal';
    modalDiv.className = 'modal';
    modalDiv.style.display = 'flex';

    // Crear el contenido del modal
    const modalContentDiv = document.createElement('div');
    modalContentDiv.className = className;

    // Crear el botón de cerrar
    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';

    closeButton.addEventListener('click', function() {
        removeModal();
    });

    // Crear el título del modal
    const titleH2 = document.createElement('h2');
    titleH2.innerText = title;

    // Agregar el botón de cerrar y el título al contenido del modal
    modalContentDiv.appendChild(closeButton);
    modalContentDiv.appendChild(titleH2);

    // Agregar el contenido del modal al div del modal
    modalDiv.appendChild(modalContentDiv);

    // Agregar el div del modal al body del documento
    document.body.appendChild(modalDiv);

    //Cierra el modal al hacer clic fuera de él
    window.onclick = function(event) {
    
        if (event.target == modalDiv) {
            removeModal();
        }
    }
}

export function createFormAddContact() {
    // Obtener el contenido del modal
    const modalContentDiv = document.querySelector('.modal-add-contact');

    // Crear el formulario
    const form = document.createElement('form');
    form.id = 'contactForm';

    // Crear el div del campo de entrada
    const formGroup1 = document.createElement('div');
    formGroup1.className = 'form-group';

    // Crear la etiqueta del campo de entrada
    const label1 = document.createElement('label');
    label1.setAttribute('for', 'formAddContact');
    label1.innerText = 'Id del usuario:';

    // Crear el campo de entrada
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'formAddContact';
    input.placeholder = 'Escribe el Id';

    // Crear la etiqueta del campo de resultado
    const label2 = document.createElement('label');
    label2.setAttribute('for', 'formAddContact');
    label1.id = 'resultAddContact';
    label2.className ='label-result'
    label2.innerText = 'ﾠ';

    // Agregar la etiqueta y el campo de entrada al div del campo de entrada
    formGroup1.appendChild(label1);
    formGroup1.appendChild(input);
    formGroup1.appendChild(label2);

    // Crear el div del botón
    const formGroup2 = document.createElement('div');
    formGroup2.className = 'form-group';

    // Crear el botón de enviar
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'submit-button';
    submitButton.innerText = 'Enviar';

    // Agregar el botón al div del botón
    formGroup2.appendChild(submitButton);

    // Agregar los elementos al formulario
    form.appendChild(formGroup1);
    form.appendChild(formGroup2);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        console.log('Formulario enviado');
        const contacId = input.value
        console.log(contacId);
        //NOTA: Hacer Validaciones, posteriormente cerrar el modal
        reviewContact(contacId);
        input.value = ''
        removeModal();

    });

    // Agregar el formulario al contenido del modal
    modalContentDiv.appendChild(form);
}

export function removeModal() {
    // Obtener el div del modal
    const modalDiv = document.getElementById('modal');

    // Verificar si el modal existe antes de intentar eliminarlo
    if (modalDiv) {
        // Eliminar el div del modal
        modalDiv.parentNode.removeChild(modalDiv);
    }
}