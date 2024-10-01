import { expenseFixture } from '../../tests/fixtures/expense.js';
import { GetExpenseByIdController } from './get-expense-by-id.js';

describe('GetExpenseByIdController', () => {
    class GetExpenseByIdUseCaseStub {
        async execute(expenseId) {
            const expense = {
                ...expenseFixture,
                id: expenseId,
            };
            return expense;
        }
    }

    const makeSut = () => {
        const getExpenseByIdUseCase = new GetExpenseByIdUseCaseStub();
        const sut = new GetExpenseByIdController(getExpenseByIdUseCase);

        return sut;
    };

    test('should return 200 when expense is found', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(200);
        expect(result.body.id).toBe(httpRequest.params.expenseId);
    });

    test('should return 400 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: 'invalid_id',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 404 when expense is not found', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest
            .spyOn(sut.getExpenseByIdUseCase, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe('Expense not found');
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest
            .spyOn(sut.getExpenseByIdUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call GetExpenseByIdUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = import.meta.jest.spyOn(
            sut.getExpenseByIdUseCase,
            'execute'
        );

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.expenseId);
    });
});
