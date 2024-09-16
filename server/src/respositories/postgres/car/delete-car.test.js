import { PostgresDeleteCarRepository } from './delete-car.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

describe('PostgresCreateCarRepository', () => {
    const sut = new PostgresDeleteCarRepository();

    test('should delete a car sucessfully', async () => {
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
            id: car.id,
            user_id: user.id,
            brand: car.brand,
            name: car.name,
            year: car.year,
            plate: car.plate,
            expenses: 0,
            entry_price: car.entry_price,
        });
    });
});
