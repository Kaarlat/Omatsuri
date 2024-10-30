// src/controllers/eventController.js

export const getEvents = async (req, res) => {
    try {
      const events = await Event.find();
      
      console.log('Datos de eventos:', events); // Esto te ayudará a ver los datos en la consola
      
      res.render('event', { events });
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
      res.status(500).send('Error al obtener los eventos');
    }
  };
  