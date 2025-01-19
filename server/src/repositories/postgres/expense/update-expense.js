import prisma from '../../../../prisma/prisma.js';

export class PostgresUpdateExpenseRepository {
    async execute(id, updateExpenseParams) {
        const expenseUpdated = await prisma.expense.update({
            where: {
                id: id,
            },
            data: updateExpenseParams,
        });

        return expenseUpdated;
    }
}
