import { TicketRepository } from '../repositories/ticket.repository.js';
import Cart from '../dao/models/cart.model.js';
import Event from '../dao/models/event.model.js';

const ticketRepository = new TicketRepository();

export const finalizePurchase = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await Cart.findById(cartId).populate('items.eventId');
        
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const failedItems = [];
        const successfulItems = [];
        let totalAmount = 0;

        // Verificar stock y procesar cada item
        for (const item of cart.items) {
            const event = item.eventId;
            if (event.capacity >= item.quantity) {
                // Hay suficiente stock
                event.capacity -= item.quantity;
                await event.save();
                
                totalAmount += event.price * item.quantity;
                successfulItems.push(item);
            } else {
                // No hay suficiente stock
                failedItems.push(item);
            }
        }

        if (successfulItems.length > 0) {
            // Crear ticket para los items exitosos
            const ticket = await ticketRepository.createTicket({
                amount: totalAmount,
                purchaser: req.session.user.email
            });

            // Actualizar carrito solo con los items que fallaron
            cart.items = failedItems;
            await cart.save();

            return res.status(200).json({
                status: 'success',
                ticket,
                failedItems: failedItems.map(item => item.eventId._id)
            });
        }

        return res.status(400).json({
            status: 'error',
            message: 'No se pudo procesar ningún item del carrito',
            failedItems: failedItems.map(item => item.eventId._id)
        });

    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al procesar la compra'
        });
    }
};
