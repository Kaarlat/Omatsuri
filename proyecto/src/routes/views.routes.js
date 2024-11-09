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
router.post('/sessions/register', registerUser); 
router.post('/sessions/login', loginUser); 

// Manejo de cookies
router.get('/setCookie', (req, res) => {
    res.cookie('userSession', 'cookie123', { maxAge: 3600000, signed: true });
    res.send('Cookie seteada en la ruta /setcookie');
});

router.get('/getCookie', (req, res) => {
    const userSession = req.cookies.userSession;
    if (userSession) {
        res.send(`Cookie encontrada: ${userSession}`);
    } else {
        res.send('No hay cookies con el nombre especificado');
    }
});

router.get('/deleteCookie', (req, res) => {
    res.clearCookie('userSession');
    res.send('Cookie eliminada');
});

export default router;

