import request from 'supertest';
import { app } from '../app.js';

import { carFixture } from '../tests/fixtures/car.js';
import { userFixture } from '../tests/fixtures/user.js';
import { expenseFixture } from '../tests/fixtures/expense.js';
import { faker } from '@faker-js/faker';

describe('Expense Routes E2E Tests', () => {
    test('POST /api/expenses', async () => {
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
            .post('/api/expenses')
            .send({
                ...expenseFixture,
                car_id: carCreated.id,
                id: undefined,
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeTruthy();
    });

    test('GET /api/expenses/:expenseId', async () => {
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

        const { body: expenseCreated } = await request(app)
            .post('/api/expenses')
            .send({
                ...expenseFixture,
                car_id: carCreated.id,
                id: undefined,
            });

        const response = await request(app).get(
            `/api/expenses/${expenseCreated.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expenseCreated);
    });

    test('GET /api/expenses/', async () => {
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

        const { body: expenseCreated1 } = await request(app)
            .post('/api/expenses')
            .send({
                ...expenseFixture,
                car_id: carCreated.id,
                id: undefined,
            });

        const response = await request(app).get(
            `/api/expenses/?carId=${carCreated.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([expenseCreated1]);
    });

    test('PATCH /api/expenses/:expenseId', async () => {
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

        const { body: expenseCreated } = await request(app)
            .post('/api/expenses')
            .send({
                ...expenseFixture,
                car_id: carCreated.id,
                id: undefined,
            });

        const response = await request(app)
            .patch(`/api/expenses/${expenseCreated.id}`)
            .send({
                amount: Number(faker.commerce.price({ min: 20000, max: 1000000 })),
                description: faker.commerce.productDescription(),
            });

        expect(response.status).toBe(200);
        expect(response.body).not.toStrictEqual(expenseCreated);
    });

    test('DELETE /api/expenses/:expenseId', async () => {
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

        const { body: expenseCreated } = await request(app)
            .post('/api/expenses')
            .send({
                ...expenseFixture,
                car_id: carCreated.id,
                id: undefined,
            });

        const response = await request(app).delete(
            `/api/expenses/${expenseCreated.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expenseCreated);
    });
});
