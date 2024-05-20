import { apiUpdateUserName, apiUpdateUserDescription, apiGetUserDescription, apiGetUserName } from "../../apis/userProfile.js";
import { openImageModal } from "../../chat/createChat.js";


async function loadUserInfo() {
    getUserName();
    getUserDescription();
    updateUserName();
    updateUserDescription();
}

async function uploadImage() {

}

document.querySelector('.user-profile-image').addEventListener('click', function () {
    openImageModal(userImage.src);
});


async function getUserName() {
    // Buscar primero por el localStorage, sino consultar
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
    // Buscar primero por el localStorage, sino consultar
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
    const typingDelay = 1500; //1.5 segundos

    const userNameElement = document.getElementById('userName');
    userNameElement.addEventListener('input', () => {
        //Reiniciar contador
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
    const typingDelay = 1500; //1.5 segundos

    const userDescriptionElement = document.getElementById('userDescription');
    userDescriptionElement.addEventListener('input', () => {
        //Reiniciar contador
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

export {
    showNotification,
    changeImgUser,
    getUserName,
    getUserDescription,
    updateUserName,
    updateUserDescription,
    loadUserInfo,
    uploadImage
}