import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['concierto', 'teatro', 'deportivo', 'cultural', 'academico', 'otro'],
        index: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        start: {
            type: String,
            required: true
        },
        end: String
    },
    location: {
        venue: {
            type: String,
            required: true
        },
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            coordinates: {
                lat: Number,
                lng: Number
            }
        }
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    capacity: {
        type: Number,
        min: [1, 'La capacidad debe ser al menos 1']
    },
    price: {
        type: Number,
        default: 0,
        min: [0, 'El precio no puede ser negativo']
    },
    image: {
        url: String,
        alt: String
    },
    status: {
        type: String,
        enum: ['activo', 'cancelado', 'finalizado', 'pospuesto'],
        default: 'activo'
    },
    attendees: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['confirmado', 'pendiente', 'cancelado'],
            default: 'pendiente'
        },
        registeredAt: {
            type: Date,
            default: Date.now
        }
    }],
    tags: [String],
    additionalInfo: {
        requirements: String,
        restrictions: String,
        notes: String
    }
}, {
    timestamps: true
});

// Índices para mejorar las búsquedas
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1, date: 1 });
eventSchema.index({ 'location.venue': 1 });
eventSchema.index({ status: 1 });

// Método para verificar disponibilidad
eventSchema.methods.checkAvailability = function() {
    if (!this.capacity) return true;
    return this.attendees.filter(a => a.status === 'confirmado').length < this.capacity;
};

// Método para agregar asistente
eventSchema.methods.addAttendee = async function(userId) {
    if (!this.checkAvailability()) {
        throw new Error('El evento está lleno');
    }
    
    const existingAttendee = this.attendees.find(a => a.userId.equals(userId));
    if (existingAttendee) {
        throw new Error('El usuario ya está registrado en este evento');
    }

    this.attendees.push({
        userId,
        status: 'confirmado'
    });

    return this.save();
};

const Event = mongoose.model('Event', eventSchema);

export default Event;