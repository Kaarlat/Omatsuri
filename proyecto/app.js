import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { engine } from 'express-handlebars'; 
import viewsRouter from './src/routes/views.routes.js';
import homeRouter from './src/routes/home.js';
import RealTimeEvent from './src/models/realTimeEvent.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';
import sessionsRouter from './src/routes/sessions.js';
import usersRouter from './src/routes/users.js';
import cartsRouter from './src/routes/carts.js';
import jwtStrategy from './src/passport/jwtStrategy.js';
import dotenv from 'dotenv';
import session from 'express-session';
import initializePassport from './src/config/passport.js';
import { helpers } from './src/helpers/handlebars.js';
import config from './src/config/config.js';
import errorHandler from './src/middlewares/errorHandler.js';
import loggerMiddleware from './src/middlewares/loggerMidleware.js';
import mocksRouter from './src/routes/mocks.router.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Conexión a MongoDB
const mongoUri = 'mongodb+srv://Omatsuri:Coder123@cluster0.d4t0t.mongodb.net/';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.log('Error al conectar a MongoDB:', err));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Omatsuri API',
      version: '1.0.0',
      description: 'API documentation for Omatsuri project',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta a tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Handlebars
app.engine('handlebars', engine({
    helpers: helpers,
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));  
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'src', 'views')); 

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use(errorHandler);
app.use(loggerMiddleware);

// Add JSON error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON Parse Error:', err);
    console.error('Request Body:', req.body);
    return res.status(400).json({ 
      status: 400,
      message: 'Invalid JSON format',
      error: err.message 
    });
  }
  next();
});

// Configuración de cookies y autenticación
app.use(cookieParser("Coder123"));
app.use(passport.initialize());

// Configuración del middleware de sesión
app.use(session({
  secret: 'secretCoder',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 7000000 }
}));

// JWT y Passport
initializePassport(passport);
passport.use(jwtStrategy);

// Rutas
app.use('/', viewsRouter);
app.use('/session', sessionsRouter);
app.use('/user', usersRouter);
app.use('/api/mocks', mocksRouter);
app.use('/events', viewsRouter);
app.use('/carts', cartsRouter);

// Iniciar el servidor
console.log(config);
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor arriba en el puerto: ${PORT}`);
});