// Funciones de utilidad

export function hiddenWords(palabra) {
    let hiddenWord = '';
    for (let i = 0; i < palabra.length; i++) {
        hiddenWord += '*';
    }
    return hiddenWord;
}

export function scrollToBottom() {
    const messageContainer = document.getElementById('message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

export function createSpinner() {
    const spinnerContainer = document.createElement('div');
    spinnerContainer.id = 'spinnerContainer';
    spinnerContainer.classList.add('spinner-container');

    // Crear el div del spinner
    const spinner = document.createElement('div');
    spinner.id = 'spinner';
    spinner.classList.add('spinner');
    spinnerContainer.appendChild(spinner);

    // Añadir el contenedor del spinner al final del div 'message-container'
    const messageContainer = document.getElementById('message-container');
    messageContainer.appendChild(spinnerContainer);
}

export function removeButtonClicked(button) {
    const buttons = document.querySelectorAll('.contacts-menu');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase 'active' de todos los botones
            buttons.forEach(btn => btn.classList.remove('clicked'));
            
            // Agregar la clase 'active' al botón actual
            this.classList.add('clicked');
        });
    });
}

export function cleanSectionChat() {
    const chatSection = document.getElementById('chat');
    chatSection.innerHTML = ''; // Limpiamos el contenido existente
}