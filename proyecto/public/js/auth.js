// Cambiar entre los formularios de login y registro
document.getElementById('signUpBtn').addEventListener('click', () => {
    document.querySelector('.container').classList.add('active-panel');
});

document.getElementById('signInBtn').addEventListener('click', () => {
    document.querySelector('.container').classList.remove('active-panel');
});

// Función para iniciar sesión
const loginUser = async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.status === 200) {
            Swal.fire('¡Éxito!', 'Inicio de sesión exitoso', 'success');
            // Redirigir o guardar token según sea necesario
        } else {
            Swal.fire('Error', data.message, 'error');
        }
    } catch (error) {
        Swal.fire('Error', 'Error en el servidor', 'error');
    }
};

// Función para registrar un usuario
const registerUser = async () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, email, age, password })
        });

        const data = await response.json();

        if (response.status === 201) {
            Swal.fire('¡Registrado!', 'Usuario registrado con éxito', 'success');
            // Cambiar a la vista de login
            document.querySelector('.container').classList.remove('active-panel');
        } else {
            Swal.fire('Error', data.message, 'error');
        }
    } catch (error) {
        Swal.fire('Error', 'Error en el servidor', 'error');
    }
};
