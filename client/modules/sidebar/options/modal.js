// Función para abrir un modal específico
function openModal(modal) {
    modal.classList.add('modal--show');
}

// Función para cerrar un modal específico
function closeModal(modal) {
    modal.classList.remove('modal--show');
}

// Si se hace clic fuera del modal lo cierra
document.addEventListener('click', function (event) {
    const modal = event.target.closest('.modal');
    if (modal && !event.target.closest('.modal-content')) {
        closeModal(modal);
    }
});

export {
    openModal,
    closeModal,
}
