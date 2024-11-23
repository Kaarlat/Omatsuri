import express from 'express';
const router = express.Router();
import { getEvents } from '../controllers/eventController.js';

router.get('/events', getEvents);

export default router;
