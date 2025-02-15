import { Router } from 'express';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Event from '../models/event.js';

const router = Router();

// Endpoint para generar usuarios mock
router.get('/mockingusers', async (req, res) => {
    const users = [];
    const passwordHash = await bcrypt.hash('coder123', 10);

    for (let i = 0; i < 50; i++) {
        users.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: passwordHash,
            role: faker.helpers.randomize(['user', 'admin']),
            events: []
        });
    }

    res.json(users);
});

// Endpoint para generar datos mock
router.post('/generateData', async (req, res) => {
    const { users: userCount, events: eventCount } = req.body;

    const passwordHash = await bcrypt.hash('coder123', 10);
    const users = [];
    const events = [];

    for (let i = 0; i < userCount; i++) {
        users.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: passwordHash,
            role: faker.helpers.randomize(['user', 'admin']),
            events: []
        });
    }

    for (let i = 0; i < eventCount; i++) {
        events.push({
            title: faker.commerce.productName(),
            priceTicket: faker.commerce.price(),
            stockTicket: faker.datatype.number({ min: 1, max: 100 }),
            category: faker.commerce.department(),
            date: faker.date.future()
        });
    }

    try {
        await User.insertMany(users);
        await Event.insertMany(events);
        res.status(201).json({ message: 'Datos generados e insertados correctamente' });
    } catch (error) {
        console.error('Error al insertar datos:', error);
        res.status(500).json({ message: 'Error al insertar datos' });
    }
});

// Endpoint para mocking events
router.get('/mockingevents', (req, res) => {
    const events = [];
    for (let i = 0; i < 10; i++) {
        events.push({
            title: faker.commerce.productName(),
            priceTicket: faker.commerce.price(),
            stockTicket: faker.datatype.number({ min: 1, max: 100 }),
            category: faker.commerce.department(),
            date: faker.date.future()
        });
    }
    res.json(events);
});

export default router;