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