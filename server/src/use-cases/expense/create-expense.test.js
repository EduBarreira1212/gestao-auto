import { CreateExpenseUseCase } from './create-expense.js';
import { expenseFixture } from '../../tests/fixtures/expense.js';

describe('CreateExpenseUseCase', () => {
    const expense = {
        ...expenseFixture,
        id: undefined,
    };

    class PostgresGetCarByIdRepositoryStub {
        async execute(carId) {
            return carId;
        }
    }

    class PostgresCreateExpenseRepositoryStub {
        async execute(expense) {
            return expense;
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'Generated_UUID';
        }
    }

    const makeSut = () => {
        const postgresGetCarByIdRepository = new PostgresGetCarByIdRepositoryStub();

        const postgresCreateExpenseRepository =
            new PostgresCreateExpenseRepositoryStub();

        const idGeneratorAdapterStub = new IdGeneratorAdapterStub();

        const sut = new CreateExpenseUseCase(
            postgresGetCarByIdRepository,
            idGeneratorAdapterStub,
            postgresCreateExpenseRepository
        );

        return sut;
    };
    test('should create expense sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(expense);

        expect(result).toBeTruthy();
    });

    test('should throw car with id provided do not exists', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.getCarByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const promise = sut.execute(expense.car_id);

        await expect(promise).rejects.toThrow(
            new Error('Car with provided ID do not exists')
        );
    });

    test('should ensure PostgresGetCarByIdRepository is called', async () => {
        const sut = makeSut();

        const executeSpy = import.meta.jest.spyOn(
            sut.getCarByIdRepository,
            'execute'
        );

        await sut.execute(expense);

        expect(executeSpy).toHaveBeenCalledWith(expense.car_id);
    });

    test('should ensure idGeneratorAdapter is called', async () => {
        const sut = makeSut();

        const idGeneratorSpy = import.meta.jest.spyOn(
            sut.idGeneratorAdapter,
            'execute'
        );

        const createExpenseRepositorySpy = import.meta.jest.spyOn(
            sut.createExpenseRepository,
            'execute'
        );

        await sut.execute(expense);

        expect(idGeneratorSpy).toHaveBeenCalled();
        expect(createExpenseRepositorySpy).toHaveBeenCalledWith({
            ...expense,
            id: 'Generated_UUID',
        });
    });

    test('should throw if idGeneratorAdapter throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.idGeneratorAdapter, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(expense);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if PostgresCreateExpenseRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.createExpenseRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(expense);

        await expect(promise).rejects.toThrow();
    });
});
