import { CreateCarUseCase } from './create-car.js';
import { carFixture } from '../../tests/fixtures/car.js';

describe('CreateCarUseCase', () => {
    const car = {
        ...carFixture,
        id: undefined,
    };

    class PostgresGetUserByIdRepositoryStub {
        async execute(userId) {
            return userId;
        }
    }

    class PostgresCreateCarRepositoryStub {
        async execute(car) {
            return car;
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'Generated_UUID';
        }
    }

    const makeSut = () => {
        const postgresGetUserByIdRepositoryStub =
            new PostgresGetUserByIdRepositoryStub();

        const postgresCreateCarRepositorieStub =
            new PostgresCreateCarRepositoryStub();

        const idGeneratorAdapterStub = new IdGeneratorAdapterStub();

        const sut = new CreateCarUseCase(
            postgresGetUserByIdRepositoryStub,
            postgresCreateCarRepositorieStub,
            idGeneratorAdapterStub
        );

        return sut;
    };
    test('should create car sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(car);

        expect(result).toBeTruthy();
    });

    test('should throw user with id provided not found', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresGetUserByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const promise = sut.execute(car);

        await expect(promise).rejects.toThrow(new Error('User ID invalid'));
    });

    test('should ensure idGeneratorAdapter is called', async () => {
        const sut = makeSut();

        const idGeneratorSpy = import.meta.jest.spyOn(
            sut.idGeneratorAdapter,
            'execute'
        );

        const createCarRepositorySpy = import.meta.jest.spyOn(
            sut.postgresCreateCarRepository,
            'execute'
        );

        await sut.execute(car);

        expect(idGeneratorSpy).toHaveBeenCalled();
        expect(createCarRepositorySpy).toHaveBeenCalledWith({
            ...car,
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

        const promise = sut.execute(car);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if postgresCreateCarRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresCreateCarRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(car);

        await expect(promise).rejects.toThrow();
    });
});
