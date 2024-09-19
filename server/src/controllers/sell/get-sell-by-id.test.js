import { GetSellByIdController } from './get-sell-by-id.js';

describe('GetSellByIdController', () => {
    class GetSellByIdUseCaseStub {
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
        const getSellByIdUseCase = new GetSellByIdUseCaseStub();
        const sut = new GetSellByIdController(getSellByIdUseCase);

        return sut;
    };

    test('should return 200 when sell is found', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(200);
        expect(result.body.id).toBe(httpRequest.params.userId);
    });

    test('should return 400 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: 'invalid_id',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 404 when car is not found', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest.spyOn(sut.getSellByIdUseCase, 'execute').mockImplementationOnce(() => {
            return null;
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe('Sell not found');
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest.spyOn(sut.getSellByIdUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call GetCarByIdUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = import.meta.jest.spyOn(sut.getSellByIdUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.sellId);
    });
});
