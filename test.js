const request = require('supertest');
const { app, closeServer } = require('./server'); // Asegúrate de que esta ruta sea correcta

describe('POST /login', () => {
    it('should respond with 200 on successful login', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'carlos2000vm@gmail.com', // Cambia esto por un email válido en tu base de datos
                password: '1234' // Cambia esto por la contraseña correcta
            });
        expect(response.status).toBe(200);
    });

    it('should respond with 401 on failed login', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'wrong@example.com',
                password: 'wrongpassword'
            });
        expect(response.status).toBe(401);
    });
});

// Cerrar el servidor después de las pruebas
afterAll(async () => {
    await closeServer();
});
