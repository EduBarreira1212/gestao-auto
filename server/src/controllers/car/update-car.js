import { validate } from 'uuid';

export class UpdateCarController {
    constructor(updateCarUseCase) {
        this.updateCarUseCase = updateCarUseCase;
    }
    async execute(httpRequest) {
        try {
            const carId = httpRequest.params.carId;

            const isIdValid = validate(carId);

            if (!isIdValid) {
                return { statusCode: 404, body: { message: 'ID invalid' } };
            }

            const params = httpRequest.body;

            const allowedFields = [
                'brand',
                'name',
                'year',
                'plate',
                'entry_price',
                'expenses',
            ];

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field)
            );

            if (someFieldIsNotAllowed) {
                return {
                    statusCode: 400,
                    body: { message: 'Some provided field is not allowed' },
                };
            }

            if (params.year) {
                const isYearValid = params.year > 0;

                if (!isYearValid) {
                    return {
                        statusCode: 400,
                        body: { message: 'Year must be positive number' },
                    };
                }
            }

            if (params.entry_price) {
                const isEntryPriceValid = params.entry_price > 0;

                if (!isEntryPriceValid) {
                    return {
                        statusCode: 400,
                        body: { message: 'Entry Price must be positive number' },
                    };
                }
            }

            if (params.expenses) {
                const isExpensesValid = params.expenses > 0;

                if (!isExpensesValid) {
                    return {
                        statusCode: 400,
                        body: { message: 'Expenses must be positive number' },
                    };
                }
            }

            const updatedCar = await this.updateCarUseCase.execute(carId, params);

            return { statusCode: 200, body: updatedCar };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
