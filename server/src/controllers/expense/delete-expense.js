import { validate } from 'uuid';

export class DeleteExpenseController {
    constructor(deleteExpenseUseCase) {
        this.deleteExpenseUseCase = deleteExpenseUseCase;
    }
    async execute(httpParams) {
        try {
            const expenseId = httpParams.params.expenseId;

            const isIdValid = validate(expenseId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const expense = await this.deleteExpenseUseCase.execute(expenseId);

            if (!expense) {
                return { statusCode: 404, body: { message: 'Expense not found' } };
            }

            return { statusCode: 200, body: expense };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
