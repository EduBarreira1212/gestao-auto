import prisma from '../../../../prisma/prisma.js';

export class PostgresCreateExpenseRepository {
    async execute(createExpenseParams) {
        const expenseCreated = await prisma.expense.create({
            data: createExpenseParams,
        });

        return expenseCreated;
    }
}
