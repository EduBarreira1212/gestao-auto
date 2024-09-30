import { DeleteExpenseUseCase } from './delete-expense.js';
import { expenseFixture as expense } from '../../tests/fixtures/expense.js';

describe('DeleteExpenseUseCase', () => {
    class PostgresGetExpenseByIdRepositoryStub {
        async execute(expenseId) {
            const expenseToReturn = {
                ...expense,
                id: expenseId,
            };

            return expenseToReturn;
        }
    }

    class PostgresDeleteExpenseRepositoryStub {
        async execute(expenseId) {
            const expenseToReturn = {
                ...expense,
                id: expenseId,
            };

            return expenseToReturn;
        }
    }

    const makeSut = () => {
        const postgresDeleteExpenseRepositoryStub =
            new PostgresDeleteExpenseRepositoryStub();

        const postgresGetExpenseByIdRepositoryStub =
            new PostgresGetExpenseByIdRepositoryStub();

        const sut = new DeleteExpenseUseCase(
            postgresGetExpenseByIdRepositoryStub,
            postgresDeleteExpenseRepositoryStub
        );

        return sut;
    };
    test('should delete expense sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(expense.id);

        expect(result).toStrictEqual(expense);
    });

    test('should throw a expense do not exists error', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.getExpenseByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const promise = sut.execute(expense.id);

        await expect(promise).rejects.toThrow(
            new Error('Expense with provided id do not exists')
        );
    });

    test('should ensure PostgresGetExpenseByIdRepository is called', async () => {
        const sut = makeSut();

        const getSellByIdRepository = import.meta.jest.spyOn(
            sut.getExpenseByIdRepository,
            'execute'
        );

        await sut.execute(expense.id);

        expect(getSellByIdRepository).toHaveBeenCalled();
        expect(getSellByIdRepository).toHaveBeenCalledWith(expense.id);
    });

    test('should ensure PostgresDeleteExpenseRepository is called', async () => {
        const sut = makeSut();

        const deleteUserRepository = import.meta.jest.spyOn(
            sut.deleteExpenseRespository,
            'execute'
        );

        await sut.execute(expense.id);

        expect(deleteUserRepository).toHaveBeenCalled();
        expect(deleteUserRepository).toHaveBeenCalledWith(expense.id);
    });

    test('should throw if PostgresDeleteExpenseRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.deleteExpenseRespository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(expense.id);

        await expect(promise).rejects.toThrow();
    });
});
