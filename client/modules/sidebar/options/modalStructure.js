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

export function removeModal() {
    // Obtener el div del modal
    const modalDiv = document.getElementById('modal');

    // Verificar si el modal existe antes de intentar eliminarlo
    if (modalDiv) {
        // Eliminar el div del modal
        modalDiv.parentNode.removeChild(modalDiv);
    }
}