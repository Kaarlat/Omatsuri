// src/models/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }, // Referencia al modelo de carrito
  role: { type: String, default: 'user' }, // Rol por defecto
});

// Middleware para encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;