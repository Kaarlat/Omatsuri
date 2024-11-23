import express from 'express';
import Evento from '../models/evento.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const evento = new Evento(req.body);
  await evento.save();
  res.json(evento);
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
