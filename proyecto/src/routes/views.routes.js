import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/api/events', async (req, res) => {
    res.render('events');
});

router.get('/api/carts', (req, res) => {
    res.render('carts'); 
});

router.get('/realtimeevents', (req, res) => {
    res.render('realTimeEvents'); 
});

router.get('/chat', (req, res) => {
    res.render('chats'); 
});

router.get('/users', (req, res) => {
    res.render('users'); 
});

router.get('/sessions', (req, res) => {
    res.render('auth'); 
});

export default router;
