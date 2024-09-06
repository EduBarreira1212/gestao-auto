import { ZodError } from 'zod';
import { createSellSchema } from '../../schemas/sell.js';

export class CreateSellController {
    constructor(createSellUseCase) {
        this.createSellUseCase = createSellUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            await createSellSchema.parseAsync(params);

            const createdSell = await this.createSellUseCase.execute(params);

            return { statusCode: 201, body: createdSell };
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
