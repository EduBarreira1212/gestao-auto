import { UpdateExpenseUseCase } from './update-expense.js';
import { expenseFixture } from '../../tests/fixtures/expense.js';

describe('UpdateSellUseCase', () => {
    const expenseId = 'valid_id';
    const expense = {
        ...expenseFixture,
        id: undefined,
    };

    class PostgresGetExpenseByIdRepositoryStub {
        async execute(expenseId) {
            return {
                ...expense,
                id: expenseId,
            };
        }
    }

    class PostgresUpdateExpenseRepository {
        async execute(expenseId, expenseData) {
            return {
                ...expenseData,
                id: expenseId,
            };
        }
    }

    const makeSut = () => {
        const postgresGetExpenseByIdRepositoryStub =
            new PostgresGetExpenseByIdRepositoryStub();

        const postgresUpdateExpenseRepository =
            new PostgresUpdateExpenseRepository();

        const sut = new UpdateExpenseUseCase(
            postgresGetExpenseByIdRepositoryStub,
            postgresUpdateExpenseRepository
        );

        return sut;
    };
    test('should update expense sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(expenseId, expense);

        expect(result).toBeTruthy();
    });

    test('should throw a expense with provided ID do not exists error', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.getExpenseByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const promise = sut.execute(expenseId, expense);

        await expect(promise).rejects.toThrow(
            new Error('Expense with provided ID do not exists')
        );
    });

    test('should ensure PostgresGetExpenseByIdRepository is called', async () => {
        const sut = makeSut();

        const getSellByIdRepositorySpy = import.meta.jest.spyOn(
            sut.getExpenseByIdRepository,
            'execute'
        );

        await sut.execute(expenseId, expense);

        expect(getSellByIdRepositorySpy).toHaveBeenCalled();
        expect(getSellByIdRepositorySpy).toHaveBeenCalledWith(expenseId);
    });

    test('should ensure PostgresUpdateExpenseRepository is called', async () => {
        const sut = makeSut();

        const updateCarRepositorySpy = import.meta.jest.spyOn(
            sut.updateExpenseRepository,
            'execute'
        );

        await sut.execute(expenseId, expense);

        expect(updateCarRepositorySpy).toHaveBeenCalled();
        expect(updateCarRepositorySpy).toHaveBeenCalledWith(expenseId, expense);
    });

    test('should throw if PostgresGetExpenseByIdRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.getExpenseByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(expenseId, expense);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if PostgresUpdateExpenseRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.updateExpenseRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(expenseId, expense);

        await expect(promise).rejects.toThrow();
    });
});
