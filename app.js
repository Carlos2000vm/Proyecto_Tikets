// app.js
const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Si el inicio de sesión es exitoso, guarda el token y redirige
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html'; // Redirige a index.html
        } else {
            // Maneja el error
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    }
});
