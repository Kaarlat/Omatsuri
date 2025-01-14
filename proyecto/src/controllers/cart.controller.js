import Cart from '../dao/models/cart.model.js';
import Event from '../dao/models/event.model.js';

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
    // Lógica para agregar el producto al carrito
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(500).send('Error al agregar el producto al carrito');
  }
};