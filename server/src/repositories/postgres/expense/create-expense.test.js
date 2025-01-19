import { PostgresCreateExpenseRepository } from './create-expense.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';
import { expenseFixture as expense } from '../../../tests/fixtures/expense.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresCreateExpenseRepository', () => {
    const sut = new PostgresCreateExpenseRepository();

    test('should create a expense sucessfully', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });

        const result = await sut.execute({
            ...expense,
            car_id: car.id,
        });

        expect(result).not.toBeFalsy();
    });

    test('should return a expense with correct properties', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });

        const result = await sut.execute({
            ...expense,
            car_id: car.id,
        });

        expect(result).toStrictEqual({
            id: expense.id,
            car_id: car.id,
            amount: expense.amount,
            description: expense.description,
            createdAt: result.createdAt,
        });
    });
});
