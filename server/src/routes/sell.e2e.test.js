import request from 'supertest';
import { app } from '../app.js';

import { carFixture } from '../tests/fixtures/car.js';
import { userFixture } from '../tests/fixtures/user.js';
import { sellFixture } from '../tests/fixtures/sell.js';
import { faker } from '@faker-js/faker';

describe('Sell Routes E2E Tests', () => {
    test('POST /api/sells', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const response = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                id: undefined,
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeTruthy();
    });

    test('GET /api/sells/:sellId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: sellCreated } = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                id: undefined,
            });

        const response = await request(app).get(`/api/sells/${sellCreated.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(sellCreated);
    });

    test('GET /api/sells/', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: sellCreated1 } = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                id: undefined,
            });

        const response = await request(app).get(
            `/api/sells/?userId=${userCreated.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([sellCreated1]);
    });

    test('PATCH /api/sells/:sellId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: sellCreated } = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                id: undefined,
            });

        const response = await request(app)
            .patch(`/api/sells/${sellCreated.id}`)
            .send({
                amount: Number(faker.commerce.price({ min: 20000, max: 1000000 })),
                profit: Number(faker.commerce.price({ min: 1000, max: 100000 })),
            });

        expect(response.status).toBe(200);
        expect(response.body).not.toStrictEqual(sellCreated);
    });

    test('DELETE /api/sells/:sellId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: sellCreated } = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                id: undefined,
            });

        const response = await request(app).delete(`/api/sells/${sellCreated.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(sellCreated);
    });
});
