import User from '../models/user.js';

export const editProfile = async (req, res) => {
    try {
        const { name, email, description, phone, location } = req.body;
        const userId = req.user.id; 

        // Actualiza la información del usuario en la base de datos
        await User.findByIdAndUpdate(userId, { name, email, description, phone, location });

        // Redirigir o mostrar un mensaje de éxito
        res.redirect('/'); 
    } catch (error) {
        console.error('Error al editar el perfil:', error);
        res.status(500).send('Error al editar el perfil');
    }
};
