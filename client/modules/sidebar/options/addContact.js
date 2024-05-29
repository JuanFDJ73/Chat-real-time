import { closeModal } from '/sidebar/options/modal.js';
import { apiAddContact } from '/apis/contacts.js';

function setupAddContactForm() {
    const form = document.getElementById('contactForm');
    const input = document.getElementById('formAddContact');
    const errorMessage = document.querySelector('.error-message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (input.value !== "") {
            console.log('Formulario enviado');
            const contactId = input.value;
            console.log(contactId);

            const result = await apiAddContact(contactId);
            console.log('Resultado:', result);

            if (result.status === 'success') {
                input.value = '';
                const modal = document.getElementById('modal-add-contact');
                closeModal(modal);
                errorMessage.textContent = ''; // Limpiar mensaje de error al enviar con éxito
            } else {
                errorMessage.textContent = result.message; // Mostrar mensaje de error
            }
        } else {
            errorMessage.textContent = "El campo no puede estar vacío"; // Mostrar mensaje de error
        }
    });
    
    input.addEventListener('input', function() {
        if (input.value !== "") {
            errorMessage.textContent = '';
        }
    });
}

export {
    setupAddContactForm
};