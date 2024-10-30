import express from 'express';
import { register, login, currentUser } from '../controllers/authController.js';
import passport from 'passport';

const router = express.Router();

router.post('/sessions', login); // Ruta para login
router.get('/current', passport.authenticate('jwt', { session: false }), currentUser); // Ruta para obtener el usuario actual

export default router;
