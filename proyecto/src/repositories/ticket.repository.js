import { TicketDAO } from '../dao/ticket.dao.js';

export class TicketRepository {
    constructor() {
        this.dao = new TicketDAO();
    }

    async createTicket(purchaseData) {
        try {
            const ticketData = {
                amount: purchaseData.amount,
                purchaser: purchaseData.purchaser
            };
            return await this.dao.create(ticketData);
        } catch (error) {
            throw new Error('Error en el repositorio al crear ticket: ' + error.message);
        }
    }

    async getTicketById(id) {
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw new Error('Error en el repositorio al obtener ticket: ' + error.message);
        }
    }

    async getTicketsByPurchaser(email) {
        try {
            return await this.dao.getByPurchaser(email);
        } catch (error) {
            throw new Error('Error en el repositorio al obtener tickets del comprador: ' + error.message);
        }
    }

    async getAllTickets() {
        try {
            return await this.dao.getAll();
        } catch (error) {
            throw new Error('Error en el repositorio al obtener todos los tickets: ' + error.message);
        }
    }
}
