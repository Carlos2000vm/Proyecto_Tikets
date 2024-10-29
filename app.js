// Función para obtener eventos desde el servidor
function obtenerEventos() {
    fetch('http://localhost:3000/eventos') // Cambia la URL según tu ruta de API
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            const contenedorEventos = document.getElementById('eventos');
            contenedorEventos.innerHTML = ''; // Limpiar contenedor antes de agregar eventos
            data.forEach(evento => {
                const eventoElement = document.createElement('div');
                eventoElement.classList.add('evento');
                eventoElement.innerHTML = `
                    <img src="${evento.imagen}" alt="${evento.nombre_evento}">
                    <div class="evento-info">
                        <h2>${evento.nombre_evento}</h2>
                        <p>Fecha: ${evento.fecha_evento}</p>
                        <p>Hora: ${evento.hora_evento}</p>
                        <p>Lugar: ${evento.lugar}</p>
                        <p>Precio: $${evento.precio_ticket}</p>
                        <button class="btn-comprar" onclick="comprarTicket(${evento.id})">Comprar Ticket</button>
                    </div>
                `;
                contenedorEventos.appendChild(eventoElement);
            });
        })
        .catch(error => {
            console.error('Error al cargar los eventos:', error);
        });
}

// Función para comprar un ticket
function comprarTicket(id) {
    fetch('http://localhost:3000/comprar', { // Asegúrate de que la ruta sea correcta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
    })
    .then(response => {
        if (response.ok) {
            alert('Compra exitosa');
            obtenerEventos(); // Actualiza la lista de eventos
        } else {
            return response.json().then(errorData => {
                alert(`Error: ${errorData.error}`);
            });
        }
    })
    .catch(error => console.error('Error al comprar ticket:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío predeterminado del formulario

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Enviando datos:', { email, password }); // Log de datos enviados

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ email, password })
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/index.html'; // Redirigir a index.html
            } else {
                return response.json().then(errorData => {
                    console.error('Error en la respuesta:', errorData); // Log de error
                    alert(`Error: ${errorData.error}`); // Mensaje de error
                });
            }
        })
        .catch(error => {
            console.error('Error al hacer la solicitud:', error);
            alert('Error al conectar con el servidor. Intenta más tarde.'); // Mensaje de error general
        });
    });

    // Obtener los eventos al cargar la página
    obtenerEventos();
});


// Obtener los eventos al cargar la página
document.addEventListener('DOMContentLoaded', obtenerEventos);
