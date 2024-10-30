// src/controllers/userController.js
import User from '../models/user.js'; // Asegúrate de que la ruta a tu modelo de usuario sea correcta

export const editProfile = async (req, res) => {
    try {
        const { name, email, description, phone, location } = req.body;
        const userId = req.user.id; // Supongamos que tienes la autenticación configurada y el ID del usuario está disponible

        // Actualiza la información del usuario en la base de datos
        await User.findByIdAndUpdate(userId, { name, email, description, phone, location });

        // Redirigir o mostrar un mensaje de éxito
        res.redirect('/profile'); // Cambia esta ruta según sea necesario
    } catch (error) {
        console.error('Error al editar el perfil:', error);
        res.status(500).send('Error al editar el perfil');
    }
};
