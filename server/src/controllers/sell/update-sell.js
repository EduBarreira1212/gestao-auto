import { validate } from 'uuid';
import { ZodError } from 'zod';
import { updateSellSchema } from '../../schemas/sell.js';

export class UpdateSellController {
    constructor(updateSellUseCase) {
        this.updateSellUseCase = updateSellUseCase;
    }
    async execute(httpRequest) {
        try {
            const sellId = httpRequest.params.sellId;

            const isIdValid = validate(sellId);

            if (!isIdValid) {
                return { statusCode: 400, body: 'Sell ID invalid' };
            }

            const params = httpRequest.body;

            await updateSellSchema.parseAsync(params);

            const updatedSell = await this.updateSellUseCase.execute(sellId, params);

            return { statusCode: 200, body: updatedSell };
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
