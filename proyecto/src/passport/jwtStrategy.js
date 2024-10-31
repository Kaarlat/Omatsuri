import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js'; // Ajusta la ruta según tu estructura de carpetas
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

// Opciones para el extractor de JWT
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'jwtSecretKey', // Cambia esto por tu clave secreta
};

// Definición de la estrategia
const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        // Buscar al usuario en la base de datos usando el ID del payload
        const user = await User.findById(jwt_payload.id);

        // Si se encuentra el usuario, retornar el usuario, sino, retornar false
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

// Exportar la estrategia
export default (passport) => {
    passport.use(jwtStrategy);
};
