import { CreateCarUseCase } from './create-car.js';

describe('CreateCarUseCase', () => {
    const car = {
        user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
        brand: 'Ferrari',
        name: '488',
        year: 2018,
        plate: 'FFF0F00',
        entry_price: 2500000,
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

        jest.spyOn(
            sut.postgresGetUserByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return null;
        });

        const promise = sut.execute(car);

        await expect(promise).rejects.toThrow(new Error('User ID invalid'));
    });

    test('should ensure idGeneratorAdapter is called', async () => {
        const sut = makeSut();

        const idGeneratorSpy = jest.spyOn(sut.idGeneratorAdapter, 'execute');

        const createCarRepositorySpy = jest.spyOn(
            sut.postgresCreateCarRepository,
            'execute'
        );

        await sut.execute(car);

        expect(idGeneratorSpy).toHaveBeenCalled();
        expect(createCarRepositorySpy).toHaveBeenCalledWith({
            ...car,
            id: 'Generated_UUID',
            expenses: 0,
        });
    });

    test('should throw if idGeneratorAdapter throws', async () => {
        const sut = makeSut();

        jest.spyOn(sut.idGeneratorAdapter, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(car);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if postgresCreateCarRepository throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresCreateCarRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(car);

        await expect(promise).rejects.toThrow();
    });
});
