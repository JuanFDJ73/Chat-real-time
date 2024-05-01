import { changeImgUser } from "../sidebar/options/profile.js";
export function apiGetUserImage() {
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

export function apiUploadImage(imageFile, formData) {
    formData.append('file', imageFile);
    fetch('/api/user-upload-image', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al subir la imagen');
    })
    .then(data => {
        changeImgUser(data.image);
    })
}