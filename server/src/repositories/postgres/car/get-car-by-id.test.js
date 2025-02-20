import { PostgresGetCarByIdRepository } from './get-car-by-id.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresGetCarByIdRepository', () => {
    const sut = new PostgresGetCarByIdRepository();

    test('should get a car sucessfully', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        const result = await sut.execute(car.id);

        expect(result).not.toBeFalsy();
    });

    test('should return a car with correct properties', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        const result = await sut.execute(car.id);

        expect(result).toStrictEqual({
            ...car,
            user_id: user.id,
            photoUrls: [],
            createdAt: result.createdAt,
        });
    });
});
