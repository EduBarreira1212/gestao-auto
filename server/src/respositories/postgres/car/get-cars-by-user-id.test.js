import { PostgresGetCarsByUserIdRepository } from './get-cars-by-user-id.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresGetCarsByUserIdRepository', () => {
    const sut = new PostgresGetCarsByUserIdRepository();

    test('should get cars sucessfully', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        const result = await sut.execute(user.id);

        expect(result).not.toBeFalsy();
    });

    test('should return a car with correct properties', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        const result = await sut.execute(user.id);

        expect(result).toStrictEqual([
            {
                id: car.id,
                user_id: user.id,
                brand: car.brand,
                name: car.name,
                year: car.year,
                plate: car.plate,
                km: car.km,
                entry_price: car.entry_price,
                createdAt: result[0].createdAt,
                expenses: [],
                sell: false,
            },
        ]);
    });
});
