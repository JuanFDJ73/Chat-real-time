// Función para abrir un modal específico
function openModal(modalId) {
    console.log("Open modal", modalId);
    document.getElementById(modalId).classList.add('modal--show');
}

// Función para cerrar un modal específico
function closeModal(modalId) {
    console.log("Close modal", modalId);
    document.getElementById(modalId).classList.remove('modal--show');
}

// Si se hace clic fuera del modal lo cierra
document.addEventListener('click', function (event) {
    const modalId = event.target.closest('.modal').id;
    if (modalId && !event.target.closest('.modal-content')) {
        closeModal(modalId);
    }
});

export {
    openModal,
    closeModal,
}
