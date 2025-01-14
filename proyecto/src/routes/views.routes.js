import express from 'express';
import Event from '../models/event.js';

const router = express.Router();
let visitCount = 0;

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
            query.date = { $gte: new Date(date) };
        }

        const events = await Event.find(query);
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

// Ruta de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Contador de visitas
router.get('/visitas', (req, res) => {
    visitCount++;
    res.send(`Número de visitas: ${visitCount}`);
});

// Ruta para calcular
router.get('/calculo-bloq', (req, res) => {
    let sum = 0;
    for (let i = 0; i <= 100000; i++) {
        sum += i;
    }
    res.send(`La suma incremental de los números del 0 al 100000 es: ${sum}`);
});

export default router;