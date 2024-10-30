export const getEvents = async (req, res) => {
    try {
      const events = await Event.find();
      
      console.log('Datos de eventos:', events);
      
      res.render('event', { events });
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
      res.status(500).send('Error al obtener los eventos');
    }
  };
  