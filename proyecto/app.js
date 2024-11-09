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
import authRoutes from './src/routes/auth.js';
import './src/config/passport.js';
import usersRouter from './src/routes/users.js';
import jwtStrategy from './src/passport/jwtStrategy.js';
import dotenv from 'dotenv';
import session from 'express-session';
import initializePassport from './src/config/passport.js';

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

// Handlebars
app.engine('handlebars', engine());  
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'src', 'views')); 

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

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
app.use('/api/sessions', authRoutes); 
initializePassport(passport);
passport.use(jwtStrategy);

// Rutas
app.use('/', viewsRouter); 
app.use('/', homeRouter);
app.use('/', usersRouter);
app.use('/', authRoutes);

// Middleware para contar visitas y manejar mensajes personalizados
app.get('/', (req, res) => {
  // Verificar si es la primera visita
  if (!req.session.visits) {
    req.session.visits = 1; // Iniciar contador de visitas
    res.send('Te damos la bienvenida');
  } else {
    req.session.visits += 1; // Incrementar contador de visitas
    const userName = req.query.name || req.session.name; 

    if (req.query.name) {
      req.session.name = req.query.name;
    }

    // Enviar mensaje dependiendo de si hay un nombre o no
    if (userName) {
      res.send(`${userName} visitaste la página ${req.session.visits} veces`);
    } else {
      res.send(`Visitaste la página ${req.session.visits} veces`);
    }
  }
});

// Escuchar eventos de Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Manejar la creación de eventos
  socket.on('createEvent', async (data) => {
    try {
      // Crear un nuevo evento y guardarlo en la base de datos
      const newEvent = new RealTimeEvent(data);
      await newEvent.save();

      // Obtener la lista actualizada de eventos
      const events = await RealTimeEvent.find();

      // Emitir la lista de eventos actualizada a todos los clientes
      io.emit('productList', events);
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  });

  // Manejar la eliminación de eventos
  socket.on('deleteProduct', async (id) => {
    try {
      // Eliminar el evento de la base de datos
      await RealTimeEvent.findByIdAndDelete(id);

      // Obtener la lista actualizada de eventos
      const events = await RealTimeEvent.find();

      // Emitir la lista de eventos actualizada a todos los clientes
      io.emit('productList', events);
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor arriba en el puerto: ${PORT}`);
});
