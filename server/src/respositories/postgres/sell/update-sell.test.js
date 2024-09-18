import { PostgresUpdateSellRepository } from './update-sell.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';
import { sellFixture as sell } from '../../../tests/fixtures/sell.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresUpdateSellRepository', () => {
    const sut = new PostgresUpdateSellRepository();

    test('should update a sell sucessfully', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        await prisma.sell.create({
            data: { ...sell, user_id: user.id, car_id: car.id },
        });

        const result = await sut.execute(sell.id, {
            ...sell,
            user_id: user.id,
            car_id: car.id,
        });

        expect(result).not.toBeFalsy();
    });

    test('should return a sell with correct properties', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        await prisma.sell.create({
            data: { ...sell, user_id: user.id, car_id: car.id },
        });

        const result = await sut.execute(sell.id, {
            ...sell,
            user_id: user.id,
            car_id: car.id,
        });

        expect(result).toStrictEqual({
            id: sell.id,
            user_id: user.id,
            car_id: car.id,
            amount: sell.amount,
            profit: sell.profit,
        });
    });
});
