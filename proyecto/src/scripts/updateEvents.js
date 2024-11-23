import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Omatsuri:Coder123@cluster0.d4t0t.mongodb.net/proyectofinal';

// ID del administrador en la base de datos: 65c3e1234567890123456789
const ADMIN_ID = "65c3e1234567890123456789";

async function updateEvents() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Conectado a MongoDB');


        const db = mongoose.connection.db;
        const events = db.collection('events');
        const result = await events.updateMany(
            {}, 
            {
                $set: {
                    organizer: new mongoose.Types.ObjectId(ADMIN_ID)
                }
            }
        );

        console.log(`Eventos actualizados: ${result.modifiedCount}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Conexión cerrada');
    }
}

updateEvents();
