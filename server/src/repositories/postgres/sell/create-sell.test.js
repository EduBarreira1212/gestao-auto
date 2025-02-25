import { PostgresCreateSellRepository } from './create-sell.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';
import { sellFixture as sell } from '../../../tests/fixtures/sell.js';
import { leadFixture as lead } from '../../../tests/fixtures/lead.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresCreateSellRepository', () => {
    const sut = new PostgresCreateSellRepository();

    test('should create a sell sucessfully', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        await prisma.lead.create({ data: { ...lead, user_id: user.id } });

        const result = await sut.execute({
            ...sell,
            user_id: user.id,
            car_id: car.id,
            lead_id: lead.id,
        });

        expect(result).not.toBeFalsy();
    });

    test('should return a sell with correct properties', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        await prisma.lead.create({ data: { ...lead, user_id: user.id } });

        const result = await sut.execute({
            ...sell,
            user_id: user.id,
            car_id: car.id,
            lead_id: lead.id,
        });

        expect(result).toStrictEqual({
            ...sell,
            user_id: user.id,
            car_id: car.id,
            lead_id: lead.id,
            createdAt: result.createdAt,
        });
    });
});
