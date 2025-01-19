import prisma from '../../../../prisma/prisma.js';

export class PostgresGetExpensesByCarIdRepository {
    async execute(carId) {
        const expenses = await prisma.expense.findMany({
            where: {
                car_id: carId,
            },
        });

        return expenses;
    }
}
