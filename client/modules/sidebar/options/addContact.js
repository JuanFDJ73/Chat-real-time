import { closeModal } from '/sidebar/options/modal.js';
import { apiAddContact } from '/apis/contacts.js';

function setupAddContactForm() {
    const form = document.getElementById('contactForm');
    const input = document.getElementById('formAddContact');
    const errorMessage = document.querySelector('.input-container .error-message');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (input.value !== "") {
            console.log('Formulario enviado');
            const contactId = input.value;
            console.log(contactId);
            // Hacer Validaciones, posteriormente cerrar el modal
            await apiAddContact(contactId);
            input.value = '';
            closeModal(document.getElementById('modal-add-contact'));
            errorMessage.textContent = ''; // Limpiar mensaje de error al enviar con éxito
        } else {
            errorMessage.textContent = "El campo no puede estar vacío"; // Mostrar mensaje de error
        }
    });

    // Asegúrate de que el mensaje de error se limpia cuando el usuario empieza a escribir de nuevo
    input.addEventListener('input', function () {
        if (input.value !== "") {
            errorMessage.textContent = '';
        }
    });
}

export {
    setupAddContactForm
};