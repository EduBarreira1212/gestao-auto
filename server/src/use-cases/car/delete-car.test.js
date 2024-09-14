import { DeleteCarUseCase } from './delete-car.js';
import { carFixture as car } from '../../tests/fixtures/car.js';

describe('DeleteUserUseCase', () => {
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

    test('should throw a car do not exists error', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetCarByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return null;
        });

        const promise = sut.execute(car.id);

        await expect(promise).rejects.toThrow(new Error('Car do not exists'));
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
