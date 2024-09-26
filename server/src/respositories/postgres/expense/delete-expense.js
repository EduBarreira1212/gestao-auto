import prisma from '../../../../prisma/prisma.js';

export class PostgresDeleteExpenseRepository {
    async execute(id) {
        const expenseDeleted = await prisma.expense.delete({
            where: {
                id: id,
            },
        });

        return expenseDeleted;
    }
}
