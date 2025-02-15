import express from 'express';
const router = express.Router();

router.post('/register', (req, res) => {
    const { email, password, name, role } = req.body;
    if (role === 'admin' && req.user.role !== 'admin') {
      res.status(403).send('Acceso denegado: solo los administradores pueden registrar usuarios con rol de administrador');
    } else {
      const user = new User({
        email,
        password,
        name,
        role: role || 'user' 
      });
      user.save((err) => {
        if (err) {
          res.status(500).send('Error al registrar usuario');
        } else {
          res.send('Usuario registrado con éxito');
        }
      });
    }
  });

  export default router;