import { hiddenWords } from '/utils.js';
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