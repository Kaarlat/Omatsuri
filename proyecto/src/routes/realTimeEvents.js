import express from 'express';
import RealTimeEvent from '../models/realTimeEvent.js';

const router = express.Router();

// Ruta para crear un nuevo evento
router.post('/create', async (req, res) => {
    try {
        const newEvent = new RealTimeEvent(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
});

// Ruta para eliminar un evento
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await RealTimeEvent.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento eliminado', deletedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el evento', error });
    }
});

export default router;
