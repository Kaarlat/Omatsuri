import { Router } from 'express';
import { generateUsers, generateEvents } from '../mockData.js';
import ErrorTypes from '../errorTypes.js';

const router = Router();

router.get('/api/users', (req, res) => {
    const events = generateEvents(20);
    const users = generateUsers(10, events);
    res.json(users);
});

router.get('/api/users/:uid', (req, res, next) => {
    const { uid } = req.params;
    const uidNumber = Number(uid);

    if (isNaN(uidNumber) || uidNumber <= 0) {
        const error = new Error('Invalid user ID');
        error.type = ErrorTypes.INVALID_PARAM;
        return next(error);
    }

    // Lógica para devolver el usuario 
    res.json({ message: `User with ID ${uid}` });
});

export default router;