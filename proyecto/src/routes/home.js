import express from 'express';

const router = express.Router();

// Todos los eventos
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Filtrar eventos por categoría
router.get('/events/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const events = await Event.find({ category });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
