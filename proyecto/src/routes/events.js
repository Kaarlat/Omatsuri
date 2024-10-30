// src/routes/events.js

import express from 'express';
const router = express.Router();
import { getEvents } from '../controllers/eventController.js';

router.get('/event', getEvents);

export default router;
