// src/config/passport.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js';

passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return done(null, false, { message: 'El correo ya está registrado.' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
}));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return done(null, false, { message: 'Credenciales incorrectas.' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Estrategia JWT para verificar el usuario
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));
