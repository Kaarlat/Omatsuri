import express from 'express';
import Event from '../models/event.js';

const router = express.Router();

const categories = ['concierto', 'teatro', 'deportivo', 'cultural', 'academico', 'otro'];

// Ruta principal que muestra todos los eventos y maneja filtros
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }

        const events = await Event.find(query)
            .sort({ date: 1 })
            .lean(); // Convierte los documentos Mongoose a objetos JavaScript planos

        res.render('home', {
            events,
            categories,
            selectedCategory: category || '',
            user: req.user ? req.user.toObject() : null // Asegurarse de que el usuario también sea un objeto plano
        });
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        res.render('home', {
            events: [],
            categories,
            selectedCategory: '',
            error: 'Error al cargar los eventos. Por favor, intente más tarde.',
            user: req.user ? req.user.toObject() : null
        });
    }
});

export default router;