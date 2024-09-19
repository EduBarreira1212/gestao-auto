import { UpdateSellController } from './update-sell.js';

describe('UpdateSellController', () => {
    class UpdateSellUseCaseStub {
        async execute(sellId, params) {
            return {
                id: sellId,
                ...params,
            };
        }
    }

    const makeSut = () => {
        const updateSellUseCaseStub = new UpdateSellUseCaseStub();
        const sut = new UpdateSellController(updateSellUseCaseStub);

        return sut;
    };

    test('should return 200 and body when sell is updated with sucess', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                amount: 100000,
                profit: 10000,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBe(null);
    });

    test('should return 400 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: 'invalid_id',
            },
            body: {
                amount: 100000,
                profit: 10000,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 400 when any field is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                user_id: 'invalid_id',
                car_id: '1125edd1-2b16-41f9-84b4-2f86ba034c11',
                amount: 100000,
                profit: 10000,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 400 when unnalowed field is passed', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                amount: 100000,
                profit: 10000,
                inavlid_field: 'invalid_field',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                amount: 100000,
                profit: 10000,
            },
        };

        import.meta.jest.spyOn(sut.updateSellUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call UpdateSellUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                sellId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                amount: 100000,
                profit: 10000,
            },
        };

        const executeSpy = import.meta.jest.spyOn(sut.updateSellUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.sellId,
            httpRequest.body
        );
    });
});
