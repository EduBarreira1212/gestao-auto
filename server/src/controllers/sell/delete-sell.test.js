import { DeleteSellController } from './delete-sell.js';

describe('DeleteSellController', () => {
    class DeleteSellUseCaseStub {
        async execute(sellId) {
            const sell = {
                sell_id: sellId,
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                car_id: '1125edd1-2b16-41f9-84b4-2f86ba034c11',
                amount: 100000,
                profit: 10000,
            };
            return sell;
        }
    }

    const makeSut = () => {
        const deleteSellUseCase = new DeleteSellUseCaseStub();
        const sut = new DeleteSellController(deleteSellUseCase);

        return sut;
    };

    test('return 200 if sell deleted sucessfully', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const result = await sut.execute(httpRequest);

        console.log(result);

        expect(result.statusCode).toBe(200);
        expect(result.body.id).toBe(httpRequest.params.userId);
    });

    test('return 404 if id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: 'INVALID_ID',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
        expect(result.body.message).toBe('ID invalid');
    });

    test('return 500 if execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest.spyOn(sut.deleteSellUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call DeleteCarUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = import.meta.jest.spyOn(sut.deleteSellUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.sellId);
    });
});
