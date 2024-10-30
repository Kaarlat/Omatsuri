// src/routes/cart.js

import express from 'express';
import { getCart, addProductToCart, removeProductFromCart } from '../controllers/cartController.js';

const router = express.Router();

// Obtener el carrito
router.get('/cart', getCart);

// Agregar un producto al carrito
router.post('/cart/add', addProductToCart);

// Eliminar un producto del carrito
router.post('/cart/remove', removeProductFromCart);

export default router;
