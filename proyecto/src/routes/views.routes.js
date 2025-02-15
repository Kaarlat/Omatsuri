import express from 'express';
import homeRouter from './home.js';
import usersRouter from './users.js';
import sessionsRouter from './sessions.js';
import authRouter from './auth.js';
import cartsRouter from './carts.js';
import realtimeeventsRouter from './realtimeevents.js';
import registerRouter from './register.js';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve the home page
 *     responses:
 *       200:
 *         description: Home page content
 */
router.use('/', homeRouter);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.use('/users', usersRouter);

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.use('/sessions', sessionsRouter);

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Unauthorized
 */
router.use('/auth', authRouter);

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Retrieve the user's cart
 *     responses:
 *       200:
 *         description: User's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Cart not found
 */
router.use('/carts', cartsRouter);

/**
 * @swagger
 * /realtimeevents:
 *   get:
 *     summary: Retrieve real-time events
 *     responses:
 *       200:
 *         description: Real-time events data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.use('/realtimeevents', realtimeeventsRouter);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.use('/register', registerRouter);

export default router;