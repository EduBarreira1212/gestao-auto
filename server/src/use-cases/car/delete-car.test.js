import { DeleteCarUseCase } from './delete-car.js';

describe('DeleteUserUseCase', () => {
    const car = {
        id: '1234edd1-2b00-42f8-00b4-2f86ba114c99',
        user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
        brand: 'Ferrari',
        name: '488',
        year: 2018,
        plate: 'FFF0F00',
        entry_price: 2500000,
    };

    class PostgresGetCarByIdRepositoryStub {
        async execute(carId) {
            const carToReturn = {
                ...car,
                id: carId,
            };

            return carToReturn;
        }
    }

    class PostgresDeleteCarRepositoryStub {
        async execute(carId) {
            const carToReturn = {
                ...car,
                id: carId,
            };

            return carToReturn;
        }
    }

    const makeSut = () => {
        const postgresDeleteCarRepositoryStub =
            new PostgresDeleteCarRepositoryStub();

        const postgresGetCarByIdRepositoryStub =
            new PostgresGetCarByIdRepositoryStub();

        const sut = new DeleteCarUseCase(
            postgresGetCarByIdRepositoryStub,
            postgresDeleteCarRepositoryStub
        );

        return sut;
    };
    test('should delete car sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(car.id);

        expect(result).toStrictEqual(car);
    });

    test('should throw a car already exists error', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetCarByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return car;
        });

        const result = await sut.execute(car.id);

        expect(result).toStrictEqual(car);
    });

    test('should ensure PostgresDeleteCarRepository is called', async () => {
        const sut = makeSut();

        const deleteUserRepository = jest.spyOn(
            sut.postgresDeleteCarRepository,
            'execute'
        );

        await sut.execute(car.id);

        expect(deleteUserRepository).toHaveBeenCalled();
        expect(deleteUserRepository).toHaveBeenCalledWith(car.id);
    });

    test('should throw if postgresDeleteUserRepositorie throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresDeleteCarRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(car.id);

        await expect(promise).rejects.toThrow();
    });
});
