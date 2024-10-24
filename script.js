document.getElementById('ticketForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const evento = document.getElementById('evento').value;
    const cantidad = document.getElementById('cantidad').value;

    const respuesta = await fetch('/api/comprar-tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ evento, cantidad }),
    });

    const data = await respuesta.json();
    document.getElementById('mensaje').textContent = data.message || 'Error al procesar la compra.';
});
