// src/routes/views.routes.js
import express from 'express';
import Event from '../models/event.js';

const router = express.Router();

// Renderizar vista principal con eventos
router.get('/', async (req, res) => {
    try {
        const { category, search, date } = req.query;
        let query = { status: 'activo' };

        // Aplicar filtros si existen
        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (date) {
            // Convertir la fecha a un objeto Date y buscar eventos en ese día
            const searchDate = new Date(date);
            const nextDay = new Date(searchDate);
            nextDay.setDate(nextDay.getDate() + 1);
            
            query.date = {
                $gte: searchDate,
                $lt: nextDay
            };
        }

        // Obtener eventos con los filtros aplicados
        const events = await Event.find(query)
            .sort({ date: 1 })
            .populate('organizer', 'name');

        // Obtener categorías únicas para el filtro
        const categories = await Event.distinct('category');

        res.render('home', {
            events,
            categories,
            filters: { category, search, date }
        });
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).render('error', { 
            message: 'Error al cargar los eventos' 
        });
    }
});

// Ruta para crear nuevo evento (vista del formulario)
router.get('/events/new', (req, res) => {
    res.render('eventForm');
});

// Ruta para ver detalles de un evento
router.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('organizer', 'name')
            .populate('attendees.userId', 'name');

        if (!event) {
            return res.status(404).render('error', { 
                message: 'Evento no encontrado' 
            });
        }

        res.render('eventDetails', { event });
    } catch (error) {
        console.error('Error al obtener evento:', error);
        res.status(500).render('error', { 
            message: 'Error al cargar el evento' 
        });
    }
});

// Ruta para eventos en tiempo real
router.get('/realtimeevents', (req, res) => {
    res.render('realTimeEvents'); 
});

// Manejo de cookies
router.get('/setCookie', (req, res) => {
    res.cookie('userSession', 'cookie123', { maxAge: 3600000, signed: true });
    res.send('Cookie seteada en la ruta /setcookie');
});

router.get('/getCookie', (req, res) => {
    const userSession = req.cookies.userSession;
    if (userSession) {
        res.send(`Cookie encontrada: ${userSession}`);
    } else {
        res.send('No hay cookies con el nombre especificado');
    }
});

router.get('/deleteCookie', (req, res) => {
    res.clearCookie('userSession');
    res.send('Cookie eliminada');
});

export default router;
