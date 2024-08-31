export class CreateCarController {
    constructor(createCarUseCase) {
        this.createCarUseCase = createCarUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'user_id',
                'brand',
                'name',
                'year',
                'plate',
                'entry_price',
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].toString().trim().length === 0) {
                    return {
                        statusCode: 404,
                        body: { message: `Missing ${field}` },
                    };
                }
            }

            const year = params.year;

            if (year <= 0) {
                return {
                    statusCode: 400,
                    body: { message: 'Year must be positive number' },
                };
            }

            const entry_price = params.entry_price;

            if (entry_price <= 0) {
                return {
                    statusCode: 400,
                    body: { message: 'Entry price must be positive number' },
                };
            }

            const createdCar = await this.createCarUseCase.execute(params);

            return { statusCode: 201, body: createdCar };
        } catch (error) {
            console.error(error);
            return { statusCode: 404, body: error };
        }
    }
}
