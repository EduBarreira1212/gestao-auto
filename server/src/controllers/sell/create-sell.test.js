import { CreateSellController } from './create-sell.js';

describe('CreateSellController', () => {
    class CreateSellUseCaseStub {
        execute(sell) {
            return sell;
        }
    }

    const makeSut = () => {
        const createSellUseCase = new CreateSellUseCaseStub();
        const sut = new CreateSellController(createSellUseCase);

        return sut;
    };

    test('should return 201 and body when sell is created with sucess', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                car_id: '1125edd1-2b16-41f9-84b4-2f86ba034c11',
                amount: 100000,
                profit: 10000,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(201);
        expect(result.body).toBe(httpRequest.body);
    });

    test('should return 400 when httpRequest send invalid body', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                invalid_field: 'invalid_field',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 500 when execute throw an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                car_id: '1125edd1-2b16-41f9-84b4-2f86ba034c11',
                amount: 100000,
                profit: 10000,
            },
        };

        import.meta.jest
            .spyOn(sut.createSellUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call CreateCarUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                car_id: '1125edd1-2b16-41f9-84b4-2f86ba034c11',
                amount: 100000,
                profit: 10000,
            },
        };

        const executeSpy = import.meta.jest.spyOn(sut.createSellUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});
