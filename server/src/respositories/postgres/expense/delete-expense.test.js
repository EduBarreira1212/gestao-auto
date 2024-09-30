import { PostgresDeleteExpenseRepository } from './delete-expense.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';
import { expenseFixture as expense } from '../../../tests/fixtures/expense.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresDeleteExpenseRepository', () => {
    const sut = new PostgresDeleteExpenseRepository();

    test('should delete a expense sucessfully', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        await prisma.expense.create({
            data: { ...expense, car_id: car.id },
        });

        const result = await sut.execute(expense.id);

        expect(result).not.toBeFalsy();
    });

    test('should return a expense with correct properties', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });
        await prisma.expense.create({
            data: { ...expense, car_id: car.id },
        });

        const result = await sut.execute(expense.id);

        expect(result).toStrictEqual({
            id: expense.id,
            car_id: car.id,
            amount: expense.amount,
            description: expense.description,
            createdAt: result.createdAt,
        });
    });
});
