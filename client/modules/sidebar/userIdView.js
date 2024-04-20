export function hiddenWords(palabra) {
    let hiddenWord = '';
    for (let i = 0; i < palabra.length; i++) {
        hiddenWord += '*';
    }
    return hiddenWord;
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