// public/js/auth.js
const formContainer = document.getElementById('form-container');
const toggle = document.getElementById('toggle');
const toggleBack = document.getElementById('toggle-back');

toggle.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.style.transform = 'translateX(-50%)'; // Desplaza hacia la izquierda
});

toggleBack.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.style.transform = 'translateX(0)'; // Regresa a la posición original
});
