import { validate } from 'uuid';

export class DeleteSellController {
    constructor(deleteSellUseCase) {
        this.deleteSellUseCase = deleteSellUseCase;
    }
    async execute(httpRequest) {
        try {
            const sellId = httpRequest.params.sellId;

            const isIdValid = validate(sellId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const deletedSell = await this.deleteSellUseCase.execute(sellId);

            return { statusCode: 200, body: deletedSell };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
