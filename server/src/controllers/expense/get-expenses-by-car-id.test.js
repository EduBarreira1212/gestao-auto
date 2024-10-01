import { expenseFixture } from '../../tests/fixtures/expense.js';
import { GetExpensesByCarIdController } from './get-expenses-by-car-id.js';

describe('GetExpensesByCarIdController', () => {
    class GetExpensesByCarIdUseCaseStub {
        async execute(carId) {
            const expense = {
                ...expenseFixture,
                car_id: carId,
            };
            return [expense];
        }
    }

    const makeSut = () => {
        const getExpensesByUserIdUseCase = new GetExpensesByCarIdUseCaseStub();
        const sut = new GetExpensesByCarIdController(getExpensesByUserIdUseCase);

        return sut;
    };

    test('should return 200 when expenses is found', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(200);
    });

    test('should return 400 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                carId: 'invalid_id',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 400 when id is not provided', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                carId: null,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
        expect(result.body.message).toBe('ID invalid');
    });

    test('return 404 if expense not founded', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest
            .spyOn(sut.getExpensesByCarIdUseCase, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest
            .spyOn(sut.getExpensesByCarIdUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call GetExpensesByCarIdUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = import.meta.jest.spyOn(
            sut.getExpensesByCarIdUseCase,
            'execute'
        );

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.query.carId);
    });
});
