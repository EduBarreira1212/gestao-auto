import { GetSellsByUserIdController } from './get-sells-by-user-id.js';

describe('GetSellsByUserIdController', () => {
    class GetSellsByUserIdUseCaseStub {
        async execute(sellId) {
            const sell = {
                sell_id: sellId,
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                car_id: '1125edd1-2b16-41f9-84b4-2f86ba034c11',
                amount: 100000,
                profit: 10000,
            };
            return [sell];
        }
    }

    const makeSut = () => {
        const getSellsByUserIdUseCase = new GetSellsByUserIdUseCaseStub();
        const sut = new GetSellsByUserIdController(getSellsByUserIdUseCase);

        return sut;
    };

    test('should return 200 when sells is found', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const result = await sut.execute(httpRequest);

        console.log(result);

        expect(result.statusCode).toBe(200);
    });

    test('should return 400 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                userId: 'invalid_id',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 400 when id is not provided', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                userId: null,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
        expect(result.body.message).toBe('User ID not provided');
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        jest.spyOn(sut.getSellsByUserIdUseCase, 'execute').mockImplementationOnce(
            () => {
                throw new Error();
            }
        );

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call GetCarsByUserIdUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = jest.spyOn(sut.getSellsByUserIdUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.query.userId);
    });
});
