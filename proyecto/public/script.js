document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Conectar al servidor de Socket.IO

    // Formulario para crear eventos
    const eventForm = document.getElementById('event-form');
    const eventList = document.getElementById('event-list');

    // Manejar el envío del formulario para crear un nuevo evento
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const priceTicket = document.getElementById('priceTicket').value;
        const stockTicket = document.getElementById('stockTicket').value;
        const category = document.getElementById('category').value;

        // Emitir evento para crear un nuevo evento
        socket.emit('createEvent', {
            title,
            priceTicket,
            stockTicket,
            category
        });

        // Limpiar el formulario después de enviarlo
        eventForm.reset();
    });

    // Escuchar la lista de eventos actualizada desde el servidor
    socket.on('productList', (events) => {
        eventList.innerHTML = ''; // Limpiar la lista de eventos

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="card">
                    <h3>${event.title}</h3>
                    <p>Categoría: ${event.category}</p>
                    <p>Precio: $${event.priceTicket}</p>
                    <p>Stock: ${event.stockTicket}</p>
                    <button class="delete-btn" data-id="${event._id}">Eliminar</button>
                </div>
            `;
            eventList.appendChild(eventCard);

            // Agregar evento de eliminación
            eventCard.querySelector('.delete-btn').addEventListener('click', () => {
                socket.emit('deleteProduct', event._id);
            });
        });
    });
});
