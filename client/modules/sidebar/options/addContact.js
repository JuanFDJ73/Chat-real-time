import { removeModal } from './modalStructure.js';
import { reviewContact} from '/apis/contacts.js';

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

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        if (input.value !== ""){
            console.log('Formulario enviado');
            const contacId = input.value
            console.log(contacId);
            //NOTA: Hacer Validaciones, posteriormente cerrar el modal
            reviewContact(contacId);
            input.value = ''
            removeModal();
        } else {
            label2.textContent = "El espacio esta vacio"
        }

    });

    // Desaparece la advcertencia cuando se escribe en el campo
    input.addEventListener('input', function () {
        label2.textContent = 'ﾠ';
    });

    // Agregar el formulario al contenido del modal
    modalContentDiv.appendChild(form);
}