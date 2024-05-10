import { apiUpdateUserName, apiUpdateUserDescription, apiUploadImage, apiGetUserDescription, apiGetUserName, apiDeleteUserImage } from "../../apis/userProfile.js";

async function createFormProfile() {
    // Obtener el contenido del modal
    const modalContentDiv = document.querySelector('.modal-user');

    // Crear el formulario
    var form = document.createElement("form");
    form.id = "uploadForm";
    form.className = "uploadForm";

    // Añadir imagen del usuario si existe
    const imgUser = document.getElementById('imageUser');
    const userImage = document.createElement('img');
    if (imgUser) {
        userImage.src = imgUser.getAttribute('src');
    } else {
        userImage.src = "/static/perfil.png";
    }
    userImage.alt = 'User Profile';
    userImage.className = 'user-profile-image';
    modalContentDiv.appendChild(userImage);

    // Crear el input para el archivo
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "imageInput";
    fileInput.accept = "image/*";
    fileInput.style.display = "none"; // Ocultar input para personalización

    // Crear etiqueta personalizada para el input
    var labelInput = document.createElement("label");
    labelInput.htmlFor = "imageInput";
    labelInput.textContent = "Cambiar imagen";
    labelInput.className = "upload-label";

    // Añadir el input y la etiqueta al formulario
    form.appendChild(fileInput);
    form.appendChild(labelInput);

    // Evento para manejar la subida de la imagen al cambiar el archivo
    fileInput.addEventListener('change', async function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                userImage.src = e.target.result;
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('file', file);
            apiUploadImage(formData);
        }
    });

    // Crear etiqueta personalizada para el botón de eliminar imagen
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar imagen";
    deleteButton.className = "delete-button";
    deleteButton.type = "button";

    // Añadir evento para manejar la eliminación de la imagen
    deleteButton.addEventListener('click', function () {
        apiDeleteUserImage();
        userImage.src = "/static/perfil.png";
    });

    // Añadir el botón de eliminar al formulario
    form.appendChild(deleteButton);


    // Agregar el nombre y la descripción del usuario
    const profileNameDiv = createProfileElement('Nombre', await apiGetUserName());
    const profileDescriptionDiv = createProfileElement('Descripción', await apiGetUserDescription());

    profileNameDiv.classList.add('profile-element');
    profileDescriptionDiv.classList.add('profile-element');

    const profileInfoDiv = document.createElement('div');
    profileInfoDiv.classList.add('profile-info');
    profileInfoDiv.appendChild(profileNameDiv);
    profileInfoDiv.appendChild(profileDescriptionDiv);

    modalContentDiv.appendChild(form);
    modalContentDiv.appendChild(profileInfoDiv);
}

function createProfileElement(label, value) {
    const div = document.createElement('div');
    div.classList.add('input-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.required = true;
    const labelElement = document.createElement('label');
    labelElement.textContent = label;

    div.appendChild(input);
    div.appendChild(labelElement);

    let timeoutId;
    input.addEventListener('input', function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            if (label === 'Nombre') {
                await apiUpdateUserName(input.value);
            } else if (label === 'Descripción') {
                await apiUpdateUserDescription(input.value);
            }
        }, 1500);
    });

    return div;
}

function changeImgUser(image) {
    const imgUser = document.getElementById('imageUser');
    if (imgUser) {
        imgUser.src = image;
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2500);
}

export {
    createFormProfile,
    changeImgUser,
    createProfileElement,
    showNotification
}