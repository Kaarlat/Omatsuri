import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'La cantidad debe ser al menos 1']
    },
    price: {
        type: Number,
        required: true
    },
    eventTitle: String,
    eventDate: Date,
    customizations: {
        notes: String,
        specialRequirements: String
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    status: {
        type: String,
        enum: ['active', 'completed', 'abandoned'],
        default: 'active'
    },
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Método para calcular el total del carrito
cartSchema.methods.calculateTotal = function() {
    this.total = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    return this.total;
};

// Método para verificar disponibilidad de entradas
cartSchema.methods.checkEventAvailability = async function() {
    for (const item of this.items) {
        const event = await mongoose.model('Event').findById(item.eventId);
        if (!event) {
            throw new Error(`Evento ${item.eventTitle} no encontrado`);
        }
        
        // Verificar si hay suficientes lugares disponibles
        const currentAttendees = event.attendees ? event.attendees.length : 0;
        const availableSpots = event.capacity - currentAttendees;
        
        if (availableSpots < item.quantity) {
            throw new Error(`No hay suficientes lugares disponibles para ${event.title}`);
        }
    }
    return true;
};

// Middleware para calcular el total antes de guardar
cartSchema.pre('save', function(next) {
    this.calculateTotal();
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
