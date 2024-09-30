import { GetExpenseByIdUseCase } from './get-expense-by-id.js';
import { expenseFixture as expense } from '../../tests/fixtures/expense.js';

describe('GetExpenseByIdUseCase', () => {
    class PostgresGetExpenseByIdRepositorieStub {
        async execute(expenseId) {
            const expenseToReturn = {
                ...expense,
                id: expenseId,
            };
            return expenseToReturn;
        }
    }

    const makeSut = () => {
        const postgresGetExpenseByIdRepositorieStub =
            new PostgresGetExpenseByIdRepositorieStub();

        const sut = new GetExpenseByIdUseCase(postgresGetExpenseByIdRepositorieStub);

        return sut;
    };

    test('should get expense sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(expense.id);

        expect(result).toStrictEqual(expense);
    });

    test('should return falsy if expense do not exists', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.getExpenseByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const result = await sut.execute(expense.id);

        expect(result).toBeFalsy();
    });

    test('should ensure PostgresGetExpenseByIdRepository is called', async () => {
        const sut = makeSut();

        const getCarByIdRepository = import.meta.jest.spyOn(
            sut.getExpenseByIdRepository,
            'execute'
        );

        await sut.execute(expense.id);

        expect(getCarByIdRepository).toHaveBeenCalled();
        expect(getCarByIdRepository).toHaveBeenCalledWith(expense.id);
    });

    test('should throw if PostgresGetExpenseByIdRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.getExpenseByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(expense.id);

        await expect(promise).rejects.toThrow();
    });
});
