// src/routes/users.js
import express from 'express';
import { editProfile } from '../controllers/userController.js';
import passport from 'passport';

const router = express.Router();

// Ruta para editar el perfil
router.post('/edit-profile', passport.authenticate('jwt', { session: false }), editProfile);

export default router;
