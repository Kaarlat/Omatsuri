// src/config/passport.js
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js'; 

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraer el token del encabezado de autorización
    secretOrKey: 'SecretKey', 
};

const strategy = new JwtStrategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) {
            return done(null, user); // Usuario encontrado
        }
        return done(null, false); // No se encontró el usuario
    } catch (error) {
        return done(error, false); // Error en la búsqueda del usuario
    }
});

// Exportar la función que inicializa Passport con la estrategia
export default (passport) => {
    passport.use(strategy);
};
