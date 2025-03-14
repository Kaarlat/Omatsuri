// Cambiar entre los formularios de login y registro
document.getElementById('signUpBtn').addEventListener('click', () => {
    document.querySelector('.container').classList.add('active-panel');
});

document.getElementById('signInBtn').addEventListener('click', () => {
    document.querySelector('.container').classList.remove('active-panel');
});

// Función para registrar un usuario
const registerUser = async () => {
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/sessions/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: firstName, email, password })
        });

        const data = await response.json();

        if (response.status === 201) {
            // Si el registro es exitoso
            Swal.fire({
                title: '¡Registrado!',
                text: 'Usuario registrado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            // Redirigir a la página principal
            window.location.href = '/';
        } else {
            // Si el registro falla
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error en el servidor',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
};

// Función para iniciar sesión
const loginUser = async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/sessions/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.status === 200) {
            // Si el inicio de sesión es exitoso
            Swal.fire({
                title: '¡Éxito!',
                text: 'Inicio de sesión exitoso',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Redirigir a la página principal
                window.location.href = '/';
            });
        } else {
            // Si el inicio de sesión falla
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error en el servidor',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
};
