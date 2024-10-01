import { expenseFixture } from '../../tests/fixtures/expense.js';
import { DeleteExpenseController } from './delete-expense.js';

describe('DeleteExpenseController', () => {
    class DeleteExpenseUseCaseStub {
        async execute(expenseId) {
            const expense = {
                ...expenseFixture,
                id: expenseId,
            };
            return expense;
        }
    }

    const makeSut = () => {
        const deleteExpenseUseCase = new DeleteExpenseUseCaseStub();
        const sut = new DeleteExpenseController(deleteExpenseUseCase);

        return sut;
    };

    test('return 200 if expense deleted sucessfully', async () => {
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

    test('return 404 if id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: 'INVALID_ID',
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
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest
            .spyOn(sut.deleteExpenseUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call DeleteExpenseUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = import.meta.jest.spyOn(
            sut.deleteExpenseUseCase,
            'execute'
        );

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.expenseId);
    });
});
