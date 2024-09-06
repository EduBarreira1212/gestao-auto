import { validate } from 'uuid';

export class GetSellByIdController {
    constructor(getSellByIdUseCase) {
        this.getSellByIdUseCase = getSellByIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const sellId = httpRequest.params.sellId;

            const isIdValid = validate(sellId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const sell = await this.getSellByIdUseCase.execute(sellId);

            if (!sell) {
                return { statusCode: 404, body: { message: 'Sell not found' } };
            }

            return { statusCode: 200, body: sell };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
