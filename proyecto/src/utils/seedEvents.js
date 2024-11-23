import mongoose from 'mongoose';
import Event from '../models/event.js';
import dotenv from 'dotenv';

dotenv.config();

const seedEvents = async () => {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Omatsuri:Coder123@cluster0.d4t0t.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Limpiar eventos existentes
        await Event.deleteMany({});

        // Crear eventos de prueba
        const events = [
            {
                title: 'Concierto de Rock',
                description: 'Una noche increíble de rock clásico',
                category: 'concierto',
                date: new Date('2024-03-15T20:00:00'),
                time: {
                    start: '20:00',
                    end: '23:00'
                },
                location: {
                    venue: 'Teatro Municipal',
                    address: {
                        street: 'Calle Principal 123',
                        city: 'Santiago',
                        state: 'RM',
                        country: 'Chile'
                    }
                },
                price: 25000,
                capacity: 500,
                status: 'activo'
            },
            {
                title: 'Romeo y Julieta',
                description: 'Clásica obra de Shakespeare',
                category: 'teatro',
                date: new Date('2024-03-20T19:00:00'),
                time: {
                    start: '19:00',
                    end: '21:30'
                },
                location: {
                    venue: 'Teatro Nacional',
                    address: {
                        street: 'Av. Libertad 456',
                        city: 'Santiago',
                        state: 'RM',
                        country: 'Chile'
                    }
                },
                price: 15000,
                capacity: 300,
                status: 'activo'
            },
            {
                title: 'Partido de Fútbol Benéfico',
                description: 'Partido amistoso a beneficio',
                category: 'deportivo',
                date: new Date('2024-03-25T16:00:00'),
                time: {
                    start: '16:00',
                    end: '18:00'
                },
                location: {
                    venue: 'Estadio Municipal',
                    address: {
                        street: 'Av. Deportes 789',
                        city: 'Santiago',
                        state: 'RM',
                        country: 'Chile'
                    }
                },
                price: 10000,
                capacity: 1000,
                status: 'activo'
            },
            {
                title: 'Exposición de Arte Moderno',
                description: 'Muestra de artistas contemporáneos',
                category: 'cultural',
                date: new Date('2024-03-30T10:00:00'),
                time: {
                    start: '10:00',
                    end: '20:00'
                },
                location: {
                    venue: 'Galería de Arte',
                    address: {
                        street: 'Paseo Cultural 321',
                        city: 'Santiago',
                        state: 'RM',
                        country: 'Chile'
                    }
                },
                price: 5000,
                capacity: 200,
                status: 'activo'
            },
            {
                title: 'Conferencia de Tecnología',
                description: 'Las últimas tendencias en tecnología',
                category: 'academico',
                date: new Date('2024-04-05T09:00:00'),
                time: {
                    start: '09:00',
                    end: '18:00'
                },
                location: {
                    venue: 'Centro de Convenciones',
                    address: {
                        street: 'Av. Tecnología 654',
                        city: 'Santiago',
                        state: 'RM',
                        country: 'Chile'
                    }
                },
                price: 50000,
                capacity: 400,
                status: 'activo'
            }
        ];

        // Insertar eventos
        await Event.insertMany(events);
        console.log('Eventos de prueba creados exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear eventos de prueba:', error);
        process.exit(1);
    }
};

seedEvents();
