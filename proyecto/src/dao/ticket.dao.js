import Ticket from './models/ticket.model.js';

export class TicketDAO {
    async create(ticketData) {
        try {
            const ticket = new Ticket(ticketData);
            await ticket.save();
            return ticket;
        } catch (error) {
            throw new Error('Error al crear el ticket: ' + error.message);
        }
    }

    async getById(id) {
        try {
            return await Ticket.findById(id);
        } catch (error) {
            throw new Error('Error al obtener el ticket: ' + error.message);
        }
    }

    async getByPurchaser(email) {
        try {
            return await Ticket.find({ purchaser: email });
        } catch (error) {
            throw new Error('Error al obtener tickets del comprador: ' + error.message);
        }
    }

    async getAll() {
        try {
            return await Ticket.find({});
        } catch (error) {
            throw new Error('Error al obtener todos los tickets: ' + error.message);
        }
    }
}
