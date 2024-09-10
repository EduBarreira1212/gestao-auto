import { DeleteSellController } from './delete-sell.js';

describe('DeleteSellController', () => {
    class DeleteSellUseCaseStub {
        async execute(carId) {
            const car = {
                user_id: carId,
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                entry_price: 2500000,
            };
            return car;
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

        jest.spyOn(sut.deleteSellUseCase, 'execute').mockImplementationOnce(() => {
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

        const executeSpy = jest.spyOn(sut.deleteSellUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.sellId);
    });
});
