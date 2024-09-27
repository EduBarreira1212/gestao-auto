import { ZodError } from 'zod';
import { createExpenseSchema } from '../../schemas/expense.js';

export class CreateExpenseController {
    constructor(createExpenseUseCase) {
        this.createExpenseUseCase = createExpenseUseCase;
    }
    async execute(httpParams) {
        try {
            const params = httpParams.body;

            await createExpenseSchema.parseAsync(params);

            const expenseCreated = await this.createExpenseUseCase.execute(params);

            return { statusCode: 201, body: expenseCreated };
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: { message: error.errors[0].message },
                };
            }
            return { statusCode: 500, body: { error } };
        }
    }
}
