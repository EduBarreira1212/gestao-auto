import { validate } from 'uuid';

export class GetSellsByUserIdController {
    constructor(getSellsByUserIdUseCase) {
        this.getSellsByUserIdUseCase = getSellsByUserIdUseCase;
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
                return {
                    statusCode: 400,
                    body: { message: 'User ID invalid' },
                };
            }

            const sells = await this.getSellsByUserIdUseCase.execute(userId);

            return { statusCode: 200, body: sells };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
