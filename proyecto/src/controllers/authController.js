// src/controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Cart from '../models/cart.js';

// Registro de usuario
export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        // Verificar si el email ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email ya registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        // Crear un nuevo carrito
        const newCart = await Cart.create({});

        // Crear nuevo usuario
        const newUser = new User({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            cart: newCart._id,
            role: 'user'
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Inicio de sesión del usuario
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            'secret123', 
            { expiresIn: '1h' }
        );

        // Enviar la cookie con el token
        res.cookie('jwt', token, { httpOnly: true });
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener usuario actual
export const getCurrentUser = (req, res) => {
    res.json({
        message: 'Usuario autenticado',
        user: req.user 
    });
};
