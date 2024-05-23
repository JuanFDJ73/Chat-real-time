import { apiSearchContacts } from "../../apis/contacts.js";
import { apiUpdateUserName, apiUpdateUserDescription, apiGetUserDescription, apiGetUserName, apiUploadImage, apiDeleteUserImage, apiGetUserImage } from "../../apis/userProfile.js";
import { openImageModal } from "../../chat/createChat.js";

async function loadUserInfo() {
    apiSearchContacts();
    apiGetUserImage();
    getUserName();
    getUserDescription();
    updateUserName();
    updateUserDescription();
    deleteImageUser();
    zoomImgModalUser();
}

function zoomImgModalUser() {
    const userImageElement = document.querySelector('.user-profile-image');
    userImageElement.addEventListener('click', function () {
        openImageModal(userImageElement.src);
    });
}

function deleteImageUser() {
    const deleteImageButton = document.getElementById('deleteImageButton');
    deleteImageButton.addEventListener('click', async function (e) {
        e.preventDefault();
        try {
            await apiDeleteUserImage();
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    });
}

async function getUserName() {
    let userName = localStorage.getItem('userName');
    if (!userName) {
        try {
            userName = await apiGetUserName();
            localStorage.setItem('userName', userName);
        } catch (error) {
            console.error('Error fetching user name:', error);
            return;
        }
    }
    const userNameElement = document.getElementById('userName');
    userNameElement.value = userName;
}

async function getUserDescription() {
    let userDescription = localStorage.getItem('userDescription');
    if (!userDescription) {
        try {
            userDescription = await apiGetUserDescription();
            localStorage.setItem('userDescription', userDescription);
        } catch (error) {
            console.error('Error fetching user description:', error);
            return;
        }
    }
    const userDescriptionElement = document.getElementById('userDescription');
    userDescriptionElement.value = userDescription;
}

function updateUserName() {
    let typingTimer;
    const typingDelay = 1500; // 1.5 seconds

    const userNameElement = document.getElementById('userName');
    userNameElement.addEventListener('input', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(async () => {
            try {
                await apiUpdateUserName(userNameElement.value);
            } catch (error) {
                console.error('Error updating user name:', error);
            }
        }, typingDelay);
    });
}

function updateUserDescription() {
    let typingTimer;
    const typingDelay = 1500; // 1.5 seconds

    const userDescriptionElement = document.getElementById('userDescription');
    userDescriptionElement.addEventListener('input', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(async () => {
            try {
                await apiUpdateUserDescription(userDescriptionElement.value);
            } catch (error) {
                console.error('Error updating user description:', error);
            }
        }, typingDelay);
    });
}

function changeImgUser(image) {
    const imgUser = document.getElementById('imageUser');
    const imgUserModal = document.getElementById('user-profile-image');
    if (image) {
        imgUser.src = image;
        imgUserModal.src = image;
    } else {
        imgUser.src = "/static/perfil.png";
        imgUserModal.src = "/static/perfil.png";
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

let croppieInstance;
function modalCroppie() {
    //mostrar modal con la imagen seleccionada
    document.getElementById('imageInput').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                showCroppieModal(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    //Cerrar modal de edicion (Croppie)
    document.getElementById('close-croppie').addEventListener('click', function () {
        closeCroppieModal();
        resetFileInput();
    });

    //Funcion Guardar Cambios
    document.getElementById('save-croppie').addEventListener('click', async function () {
        const croppieResult = await croppieInstance.result({ type: 'base64', size: 'viewport' });
        await saveCroppedImage(croppieResult);
        closeCroppieModal();
        document.getElementById('modal-user').classList.add('modal--show');
        resetFileInput();
    });

    //Funcion Cancelar Cambios
    document.getElementById('cancel-croppie').addEventListener('click', function () {
        closeCroppieModal();
        document.getElementById('modal-user').classList.add('modal--show');
        resetFileInput();
    });

    //Mostrar modal de ediccion (Croppie)
    function showCroppieModal(imageSrc) {
        document.getElementById('croppie-container').innerHTML = '';
        document.getElementById('modal-croppie').classList.add('modal--show');
        document.getElementById('modal-user').classList.remove('modal--show');
        croppieInstance = new Croppie(document.getElementById('croppie-container'), {
            url: imageSrc,
            viewport: { width: 200, height: 200 },
            boundary: { width: 300, height: 300 },
            showZoomer: true,
        });
    }

    //Cerrar modal de ediccion (Croppie)
    function closeCroppieModal() {
        document.getElementById('modal-croppie').classList.remove('modal--show');
        croppieInstance.destroy();
    }

    //Funcion para guardar la imagen cortada (Croppie)
    async function saveCroppedImage(imageBase64) {
        const formData = new FormData();
        formData.append('file', imageBase64);
        await apiUploadImage(formData);
    }
}


export {
    showNotification,
    changeImgUser,
    getUserName,
    getUserDescription,
    updateUserName,
    updateUserDescription,
    loadUserInfo,
    modalCroppie,
};
