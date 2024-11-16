import request from 'supertest';
import { app } from '../app.js';

import { carFixture } from '../tests/fixtures/car.js';
import { userFixture } from '../tests/fixtures/user.js';
import { faker } from '@faker-js/faker';
import clerkClient from '../../clerk/clerk.js';

describe('Cars Routes E2E Tests', () => {
    test('POST /api/cars', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        const response = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeTruthy();

        await clerkClient.users.deleteUser(userCreated.external_id);
    });

    test('GET /api/cars/:carId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                email: `${faker.person.firstName()}+clerk_test@gmail.com`,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const response = await request(app).get(`/api/cars/${carCreated.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(carCreated);

        await clerkClient.users.deleteUser(userCreated.external_id);
    });

    test('GET /api/cars?userId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                email: `${faker.person.firstName()}+clerk_test@gmail.com`,
                id: undefined,
            });

        const { body: carCreated1 } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: carCreated2 } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const response = await request(app).get(
            `/api/cars?userId=${userCreated.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([
            { ...carCreated1, expenses: [] },
            { ...carCreated2, expenses: [] },
        ]);

        await clerkClient.users.deleteUser(userCreated.external_id);
    });

    test('PATCH /api/users/:userId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                email: `${faker.person.firstName()}+clerk_test@gmail.com`,
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
            .patch(`/api/cars/${carCreated.id}`)
            .send({
                brand: faker.vehicle.manufacturer(),
                name: faker.vehicle.model(),
                year: 2018,
                plate: 'AAA0A00',
                entry_price: Number(
                    faker.commerce.price({ min: 20000, max: 1000000 })
                ),
            });

        expect(response.status).toBe(200);
        expect(response.body).not.toStrictEqual(carCreated);

        await clerkClient.users.deleteUser(userCreated.external_id);
    });

    test('DELETE /api/cars/:carId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                email: `${faker.person.firstName()}+clerk_test@gmail.com`,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const response = await request(app).delete(`/api/cars/${carCreated.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(carCreated);

        await clerkClient.users.deleteUser(userCreated.external_id);
    });
});
