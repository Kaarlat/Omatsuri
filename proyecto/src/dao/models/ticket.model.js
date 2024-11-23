import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

// Middleware para generar código único antes de guardar
ticketSchema.pre('save', async function(next) {
    if (!this.code) {
        const count = await mongoose.model('Ticket').countDocuments();
        this.code = 'TICKET-' + (count + 1).toString().padStart(8, '0');
    }
    next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
