import { apiUploadImage } from "../../apis/userProfile.js";
export function createFormProfile(){
    //Obtener el contenido del modal
    const modalContentDiv = document.querySelector('.modal-user');
    
    // Crear el formulario
    var form = document.createElement("form");
    form.id = "uploadForm";

    // Crear el input para el archivo
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "imageInput";
    fileInput.accept = "image/*";

    // Crear el botón de submit
    var submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Upload Image";

    // Añadir el input y el botón al formulario
    form.appendChild(fileInput);
    form.appendChild(submitButton);

    form.addEventListener("submit", function(e){
        e.preventDefault();
        const formData = new FormData();
        const imageFile = document.getElementById('imageInput').files[0];

        if (imageFile) {
            apiUploadImage(imageFile, formData);
        } else {
            alert('Please select a file to upload.');
        }
    })

    // Añadir el formulario al contenido del modal
    modalContentDiv.appendChild(form);
};

export function changeImgUser(image) {
    const imgUser = document.getElementById('imageUser');
    if (imgUser){
        imgUser.src = image;
    }
}