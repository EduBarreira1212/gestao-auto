import { PostgresGetSellsByUserIddRepository } from './get-sells-by-user-id.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';
import { sellFixture as sell } from '../../../tests/fixtures/sell.js';
import { leadFixture as lead } from '../../../tests/fixtures/lead.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresGetSellsByUserIdRepository', () => {
    const sut = new PostgresGetSellsByUserIddRepository();

    test('should get sells sucessfully', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        await prisma.lead.create({ data: { ...lead, user_id: user.id } });
        await prisma.sell.create({
            data: { ...sell, user_id: user.id, car_id: car.id, lead_id: lead.id },
        });

        const result = await sut.execute(user.id);

        expect(result).not.toBeFalsy();
    });

    test('should return a array of sells with correct properties', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        await prisma.lead.create({ data: { ...lead, user_id: user.id } });
        await prisma.sell.create({
            data: { ...sell, user_id: user.id, car_id: car.id, lead_id: lead.id },
        });

        const result = await sut.execute(user.id);

        expect(result).toStrictEqual([
            {
                id: sell.id,
                user_id: user.id,
                car_id: car.id,
                lead_id: lead.id,
                amount: sell.amount,
                profit: sell.profit,
                createdAt: result[0].createdAt,
            },
        ]);
    });
});
