import { validate } from 'uuid';

export class GetExpensesByCarIdController {
    constructor(getExpensesByCarIdUseCase) {
        this.getExpensesByCarIdUseCase = getExpensesByCarIdUseCase;
    }
    async execute(httpParams) {
        try {
            const carId = httpParams.query.carId;

            const isIdValid = validate(carId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const expenses = await this.getExpensesByCarIdUseCase.execute(carId);

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
