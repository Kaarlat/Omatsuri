// src/routes/views.routes.js
import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/authController.js';

const router = express.Router();

// Renderizar vistas
router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/api/events', async (req, res) => {
    res.render('events');
});

router.get('/api/carts', (req, res) => {
    res.render('carts'); 
});

router.get('/realtimeevents', (req, res) => {
    res.render('realTimeEvents'); 
});

router.get('/users', (req, res) => {
    res.render('users'); 
});

// Rutas para autenticación
router.get('/sessions', (req, res) => {
    res.render('auth'); 
});

router.get('/sessions/login', (req, res) => {
    res.render('login'); 
});

// Rutas para manejar registro e inicio de sesión
router.post('/sessions/register', registerUser); // Maneja la creación de un nuevo usuario
router.post('/sessions/login', loginUser); // Maneja el inicio de sesión del usuario

export default router;
