import prisma from '../../../../prisma/prisma.js';

export class PostgresGetExpenseByIdRepository {
    async execute(expenseId) {
        const expense = await prisma.expense.findUnique({
            where: {
                id: expenseId,
            },
        });

        return expense;
    }
}
