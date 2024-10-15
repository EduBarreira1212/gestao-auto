import request from 'supertest';
import { app } from '../app.js';

import { userFixture } from '../tests/fixtures/user.js';
import { faker } from '@faker-js/faker';

describe('User Routes E2E Tests', () => {
    test('POST /api/users', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeTruthy();
    });

    test('GET /api/users/:userId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        const response = await request(app).get(`/api/users/${userCreated.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(userCreated);
    });

    test('PATCH /api/users/:userId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        const response = await request(app)
            .patch(`/api/users/${userCreated.id}`)
            .send({
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 9 }),
            });

        expect(response.status).toBe(200);
        expect(response.body).not.toStrictEqual(userCreated);
    });

    test('DELETE /api/users/:userId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                id: undefined,
            });

        const response = await request(app).delete(`/api/users/${userCreated.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(userCreated);
    });
});
