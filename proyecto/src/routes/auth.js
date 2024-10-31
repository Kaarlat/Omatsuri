import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import passport from 'passport';

const router = express.Router();

// Ruta para login y register
router.post('/login', loginUser);

// Ruta protegida para obtener el usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        message: 'Usuario autenticado',
        user: req.user 
    });
});

export default router;
