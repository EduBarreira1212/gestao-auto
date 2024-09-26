import { PostgresCreateCarRepository } from './create-car.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresCreateCarRepository', () => {
    const sut = new PostgresCreateCarRepository();

    test('should create a car sucessfully', async () => {
        await prisma.user.create({ data: user });
        const result = await sut.execute({ ...car, user_id: user.id });

        expect(result).not.toBeFalsy();
    });

    test('should return a car with correct properties', async () => {
        await prisma.user.create({ data: user });
        const result = await sut.execute({ ...car, user_id: user.id });

        expect(result).toStrictEqual({
            id: car.id,
            user_id: user.id,
            brand: car.brand,
            name: car.name,
            year: car.year,
            plate: car.plate,
            entry_price: car.entry_price,
            createdAt: result.createdAt,
        });
    });
});
