import { validate } from 'uuid';

export class GetCarsByUserIdController {
    constructor(getCarsByUserIdUseCase) {
        this.getCarsByUserIdUseCase = getCarsByUserIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;

            if (!userId) {
                return {
                    statusCode: 400,
                    body: { message: 'User ID not provided' },
                };
            }

            const isIdValid = validate(userId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const cars = await this.getCarsByUserIdUseCase.execute(userId);

            return { statusCode: 200, body: cars };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { message: 'Any Error' } };
        }
    }
}
