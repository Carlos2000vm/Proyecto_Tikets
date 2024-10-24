// app.js

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    // Realiza la solicitud al backend
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Manejar el caso de éxito, redirigir o mostrar un mensaje
            alert('Inicio de sesión exitoso!');
            // Aquí puedes redirigir a la página de eventos, por ejemplo:
            window.location.href = '/events.html'; // Asegúrate de tener esta página
        } else {
            alert(data.message || 'Error en el inicio de sesión.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la solicitud.');
    }
});
