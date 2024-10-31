import express from 'express';
import passport from 'passport';
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/login', 
}));

// Ruta para registrar un nuevo usuario
router.post('/login', async (req, res) => {
    
});

export default router;
