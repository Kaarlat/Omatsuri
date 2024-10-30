// src/controllers/cartController.js

import Cart from '../models/cart.js';
import Event from '../models/event.js';

// Obtener el carrito
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId).populate('products.product');
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }
    res.render('cart', { cart });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).send('Error al obtener el carrito');
  }
};

// Agregar producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).send('Evento no encontrado');
    }

    let cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      cart = new Cart();
    }

    // Buscar si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex(p => p.product.equals(event._id));
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += 1; // Si ya está, aumentar la cantidad
    } else {
      cart.products.push({ product: event._id, quantity: 1 }); // Si no, agregar nuevo
    }

    // Recalcular el precio total
    cart.totalPrice += event.priceTicket;

    await cart.save();
    res.redirect('/cart/' + cart._id); // Redirigir al carrito actualizado
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).send('Error al agregar producto al carrito');
  }
};

// Eliminar producto del carrito
export const removeProductFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    const productIndex = cart.products.findIndex(p => p.product.equals(req.body.eventId));
    if (productIndex !== -1) {
      const event = await Event.findById(cart.products[productIndex].product);
      cart.totalPrice -= event.priceTicket * cart.products[productIndex].quantity; // Restar el precio

      cart.products.splice(productIndex, 1); // Eliminar el producto
      await cart.save();
    }

    res.redirect('/cart/' + cart._id); // Redirigir al carrito actualizado
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).send('Error al eliminar producto del carrito');
  }
};
