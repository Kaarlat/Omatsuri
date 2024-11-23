import mongoose from 'mongoose';
import Event from '../models/event.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eventos';

async function seedEvents() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Conectado a MongoDB');

        // Limpiar eventos existentes
        await Event.deleteMany({});

        const events = [
            {
                title: 'Concierto de Rock',
                description: 'Un increíble concierto de rock con las mejores bandas locales',
                category: 'concierto',
                date: new Date('2024-02-20'),
                time: {
                    start: '20:00',
                    end: '23:00'
                },
                location: {
                    venue: 'Teatro Municipal',
                    address: {
                        street: 'Calle Principal 123',
                        city: 'Ciudad de México',
                        state: 'CDMX',
                        country: 'México'
                    }
                },
                capacity: 500,
                price: 250,
                status: 'activo',
                image: {
                    url: '/images/concierto.jpg',
                    alt: 'Concierto de Rock'
                }
            },
            {
                title: 'Obra de Teatro: Romeo y Julieta',
                description: 'Clásica obra de Shakespeare interpretada por actores locales',
                category: 'teatro',
                date: new Date('2024-02-25'),
                time: {
                    start: '19:00',
                    end: '21:30'
                },
                location: {
                    venue: 'Teatro de la Ciudad',
                    address: {
                        street: 'Av. Cultural 456',
                        city: 'Ciudad de México',
                        state: 'CDMX',
                        country: 'México'
                    }
                },
                capacity: 200,
                price: 180,
                status: 'activo',
                image: {
                    url: '/images/teatro.jpg',
                    alt: 'Romeo y Julieta'
                }
            },
            {
                title: 'Torneo de Fútbol',
                description: 'Torneo amateur de fútbol 5vs5',
                category: 'deportivo',
                date: new Date('2024-03-01'),
                time: {
                    start: '09:00',
                    end: '18:00'
                },
                location: {
                    venue: 'Complejo Deportivo Norte',
                    address: {
                        street: 'Av. Deportiva 789',
                        city: 'Ciudad de México',
                        state: 'CDMX',
                        country: 'México'
                    }
                },
                capacity: 100,
                price: 0,
                status: 'activo',
                image: {
                    url: '/images/futbol.jpg',
                    alt: 'Torneo de Fútbol'
                }
            }
        ];

        // Insertar eventos
        await Event.insertMany(events);
        console.log('Eventos de prueba creados exitosamente');

    } catch (error) {
        console.error('Error al crear eventos de prueba:', error);
    } finally {
        await mongoose.connection.close();
    }
}

seedEvents();
