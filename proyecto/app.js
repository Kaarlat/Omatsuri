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

// Variables para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Conexión a MongoDB
const mongoUri = 'mongodb+srv://Omatsuri:Coder123@cluster0.d4t0t.mongodb.net/';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.log('Error al conectar a MongoDB:', err));

// Configuración de Handlebars como motor de vistas
app.engine('handlebars', engine());  
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'src', 'views')); 

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

//cookies y auth
app.use(cookieParser());
app.use(passport.initialize());
app.use('/api/sessions', authRoutes); 


// Rutas
app.use('/', viewsRouter); 
app.use('/', homeRouter);
app.use('/', userRoutes);

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
