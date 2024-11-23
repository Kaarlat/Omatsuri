import express from 'express';
import { Cart, Ticket } from '../models/cart.js';
import { finalizePurchase } from '../controllers/cart.controller.js';
import { isUser, checkSession } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Función para generar código único
function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Ruta para finalizar la compra
router.post('/:cid/purchase', checkSession, isUser, finalizePurchase);

// Ruta para procesar la compra
router.post('/purchase', async (req, res) => {
    const cart = await Cart.findById(req.body.cartId);
    const products = cart.products;

    const ticket = new Ticket();
    ticket.code = generateCode();
    ticket.purchase_datetime = new Date();
    ticket.amount = 0;
    ticket.purchaser = cart.user.email;

    const purchasedProducts = [];
    const unavailableProducts = [];

    for (const product of products) {
        const productDoc = await Product.findById(product.id);
        if (productDoc.stock >= product.quantity) {
            productDoc.stock -= product.quantity;
            purchasedProducts.push(product);
            ticket.amount += product.price * product.quantity;
        } else {
            unavailableProducts.push(product);
        }
    }

    await ticket.save();
    await cart.updateOne({ $pull: { products: purchasedProducts } });

    res.json({ ticket, unavailableProducts });
});

export default router;