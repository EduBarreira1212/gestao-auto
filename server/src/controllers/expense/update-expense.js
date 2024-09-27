import { ZodError } from 'zod';

import { updateExpenseSchema } from '../../schemas/expense.js';
import { UuidValidatorAdapter } from '../../adapters/uuid-validator.js';

export class UpdateExpenseController {
    constructor(updateExpenseUseCase) {
        this.updateExpenseUseCase = updateExpenseUseCase;
    }
    async execute(httpParams) {
        try {
            const expenseId = httpParams.params.expenseId;

            const isIdValid = UuidValidatorAdapter.execute(expenseId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const params = httpParams.body;

            await updateExpenseSchema.parseAsync(params);

            const expenseUpdated = await this.updateExpenseUseCase.execute(
                expenseId,
                params
            );

            return { statusCode: 200, body: expenseUpdated };
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
