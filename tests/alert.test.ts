const request = require('supertest');
const app = require('../src/app');
const { clearAlertsForTesting } = require('../src/controllers/alertController');

describe('API de Alertas de Alagamento', () => {
    
    beforeEach(() => {
        clearAlertsForTesting();
    });

    describe('POST /api/alerts', () => {
        it('deve criar um novo alerta com dados válidos e retornar 201', async () => {
            const alertPayload = {
                sensor_id: "sensor-teste-jest-01",
                water_level_cm: 200.5,
                latitude: -8.05,
                longitude: -34.88
            };

            const response = await request(app)
                .post('/api/alerts')
                .send(alertPayload);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('alert_id');
            expect(response.body.sensor_id).toBe(alertPayload.sensor_id);
        });

        it('deve retornar erro 400 para dados inválidos (nível de água negativo)', async () => {
            const alertPayload = {
                sensor_id: "sensor-teste-jest-02",
                water_level_cm: -100,
                latitude: -8.05,
                longitude: -34.88
            };

            const response = await request(app)
                .post('/api/alerts')
                .send(alertPayload);

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message', 'Dados inválidos');
        });
    });

    describe('GET /api/alerts/recent', () => {
        it('deve retornar uma lista vazia quando não há alertas e status 200', async () => {
            const response = await request(app).get('/api/alerts/recent');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('deve retornar uma lista com os alertas criados', async () => {
            const alertPayload = {
                sensor_id: "sensor-teste-jest-03",
                water_level_cm: 250,
                latitude: -8.05,
                longitude: -34.88
            };
            await request(app).post('/api/alerts').send(alertPayload);

            const response = await request(app).get('/api/alerts/recent');
            
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].sensor_id).toBe(alertPayload.sensor_id);
        });
    });
});