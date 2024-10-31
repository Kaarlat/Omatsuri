// src/models/cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
