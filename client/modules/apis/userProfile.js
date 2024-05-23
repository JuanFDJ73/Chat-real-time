import { changeImgUser, showNotification } from "../sidebar/options/profile.js";
function apiGetUserImage() {
    fetch('/api/get-user-image', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al recibir la imagen');
    })
    .then(data => {
        changeImgUser(data.image);
        // localStorage.setItem('userImage', data.userImage);
        // guardarlo en localStorage, para cargas mas rapidas? 
    })
}

async function apiUploadImage(formData) {
    const response = await fetch('/api/user-upload-image', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const data = await response.json();
        showNotification('Imagen actualizada con exito');
        changeImgUser(data.image);
        return data;
    } else {
        showNotification('ERROR al actualizar la Imagen');
        console.error('Error al subir la imagen: ', await response.text());
        throw new Error('Error al subir la imagen');
    }
}


async function apiGetUserName() {
    return fetch('/api/get-user-name', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al recibir el nombre del usuario');
    })
    .then(data => {
        return data.userName;
    });
}

async function apiGetUserDescription() {
    return fetch('/api/get-user-description', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al recibir la descripción del usuario');
    })
    .then(data => {
        return data.userDescription;
    });
}

async function apiUpdateUserDescription(description) {
    await fetch('/api/update-user-description', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description
        })
    })
    .then(response => {
        if (response.ok) {
            showNotification('Descripción actualizada correctamente')
        } else {
            showNotification('ERROR al actualizar la descripción');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('ERROR al actualizar la descripción');
    });
}

async function apiUpdateUserName(userName) {
    await fetch('/api/update-user-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName
        })
    })
    .then(response => {
        if (response.ok) {
            showNotification('Nombre actualizado correctamente')
        } else {
            showNotification('ERROR al actualizar el Nombre');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('ERROR al actualizar el Nombre');
    });
}

async function apiDeleteUserImage() {
    fetch('/api/delete-user-image', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Imagen eliminada correctamente');
            changeImgUser('/static/perfil.png')
        }
    })
    .catch(error => {
        showNotification('ERROR al eliminar la imagen');
        console.error('Error al eliminar la imagen:', error);
    });
}

export {
    apiGetUserName,
    apiGetUserDescription,
    apiGetUserImage,
    apiUploadImage,
    apiUpdateUserDescription,
    apiUpdateUserName,
    apiDeleteUserImage
}