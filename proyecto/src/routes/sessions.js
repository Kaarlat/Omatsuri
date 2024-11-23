import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Cart from '../models/cart.js';
import passport from 'passport';

const router = express.Router();

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
    res.render('register');
});

// Ruta para procesar el registro
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const user = new User({
            email,
            password: hashedPassword,
            name,
            role: 'user'
        });

        await user.save();

        // Crear carrito para el usuario
        const cart = new Cart({ userId: user._id, items: [] });
        await cart.save();

        // Iniciar sesión automáticamente después del registro
        req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Ruta para procesar el login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Actualizar último login
        user.lastLogin = new Date();
        await user.save();

        // Guardar sesión del usuario
        req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        res.json({ 
            message: 'Inicio de sesión exitoso',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Sesión cerrada exitosamente' });
    });
});

export default router;
