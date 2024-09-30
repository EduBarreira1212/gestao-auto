import { GetExpensesByCarIdUseCase } from './get-expenses-by-car-id.js';
import { carFixture as car } from '../../tests/fixtures/car.js';
import { expenseFixture as expense } from '../../tests/fixtures/expense.js';

describe('GetSellsByUserIdUseCase', () => {
    const carId = expense.car_id;

    class PostgresGetCarByIdRepositorieStub {
        async execute(carId) {
            const carToReturn = {
                ...car,
                id: carId,
            };
            return carToReturn;
        }
    }

    class PostgresGetExpensesByCarIdRepositorieStub {
        async execute(carId) {
            const expenseWithCarId = {
                ...expense,
                car_id: carId,
            };
            return [expenseWithCarId];
        }
    }

    const makeSut = () => {
        const postgresGetCarByIdRepositorieStub =
            new PostgresGetCarByIdRepositorieStub();

        const postgresGetExpensesByCarIdRepositorieStub =
            new PostgresGetExpensesByCarIdRepositorieStub();

        const sut = new GetExpensesByCarIdUseCase(
            postgresGetCarByIdRepositorieStub,
            postgresGetExpensesByCarIdRepositorieStub
        );

        return sut;
    };

    test('should get expense sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(carId);

        expect(result).toEqual([expense]);
    });

    test('should return falsy if car do not exists', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.getCarByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const promise = sut.execute(carId);

        await expect(promise).rejects.toThrow(
            new Error('Car with provided ID do not exists')
        );
    });

    test('should ensure PostgresGetCarByIdRepository is called with correct params', async () => {
        const sut = makeSut();

        const getUserByIdRepository = import.meta.jest.spyOn(
            sut.getCarByIdRepository,
            'execute'
        );

        await sut.execute(carId);

        expect(getUserByIdRepository).toHaveBeenCalled();
        expect(getUserByIdRepository).toHaveBeenCalledWith(carId);
    });

    test('should ensure PostgresGetExpensesByCarIdRepository is called with correct params', async () => {
        const sut = makeSut();

        const getCarsByUserIdRepository = import.meta.jest.spyOn(
            sut.getExpensesByCarIdRepository,
            'execute'
        );

        await sut.execute(carId);

        expect(getCarsByUserIdRepository).toHaveBeenCalled();
        expect(getCarsByUserIdRepository).toHaveBeenCalledWith(carId);
    });

    test('should throw if PostgresGetCarByIdRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.getCarByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(carId);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if PostgresGetExpensesByCarIdRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.getExpensesByCarIdRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(carId);

        await expect(promise).rejects.toThrow();
    });
});
