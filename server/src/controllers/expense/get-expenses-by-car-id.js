import { UuidValidatorAdapter } from '../../adapters/uuid-validator.js';

export class GetExpensesByCarIdController {
    constructor(getExpensesByCarIdUseCase) {
        this.getExpensesByCarIdUseCase = getExpensesByCarIdUseCase;
    }
    async execute(httpParams) {
        try {
            const expenseId = httpParams.query.expenseId;

            const isIdValid = UuidValidatorAdapter.execute(expenseId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const expenses = await this.getExpensesByCarIdUseCase.execute(expenseId);

            if (!expenses) {
                return { statusCode: 404, body: { message: 'No expense found' } };
            }

            return { statusCode: 200, body: expenses };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
