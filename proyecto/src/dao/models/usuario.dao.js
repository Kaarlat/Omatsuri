// usuario.dao.js
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
 firstname: { type: String, required: true },
 lastname: { type: String, required: true },
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
});

const UsuarioDAO = mongoose.model('Usuario', usuarioSchema);

export default UsuarioDAO;