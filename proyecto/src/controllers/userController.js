import User from '../models/user.js';

// Función para editar el perfil de un usuario
export const editProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const userData = req.body;

        // Aquí puedes agregar lógica para buscar el usuario y actualizarlo
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error al editar el perfil:', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
};
