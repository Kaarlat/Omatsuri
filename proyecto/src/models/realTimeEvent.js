import mongoose from 'mongoose';

const realTimeEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    priceTicket: { type: Number, required: true },
    stockTicket: { type: Number, required: true },
    category: { type: String, required: true },
});

const RealTimeEvent = mongoose.model('RealTimeEvent', realTimeEventSchema);

export default RealTimeEvent;
