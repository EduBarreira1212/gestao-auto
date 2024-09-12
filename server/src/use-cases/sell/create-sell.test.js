import { CreateSellUseCase } from './create-sell.js';

describe('CreateSellUseCase', () => {
    const sell = {
        user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
        car_id: '0124edd1-2b89-42f9-13b4-2f86ba234c41',
        amount: 100000,
        profit: 10500,
    };

    class PostgresGetUserByIdRepositoryStub {
        async execute(userId) {
            return userId;
        }
    }

    class PostgresGetCarByIdRepositoryStub {
        async execute(carId) {
            return carId;
        }
    }

    class PostgresCreateSellRepositoryStub {
        async execute(sell) {
            return sell;
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'Generated_UUID';
        }
    }

    const makeSut = () => {
        const postgresGetUserByIdRepository =
            new PostgresGetUserByIdRepositoryStub();

        const postgresGetCarByIdRepository = new PostgresGetCarByIdRepositoryStub();

        const postgresCreateSellRepository = new PostgresCreateSellRepositoryStub();

        const idGeneratorAdapterStub = new IdGeneratorAdapterStub();

        const sut = new CreateSellUseCase(
            postgresGetUserByIdRepository,
            postgresGetCarByIdRepository,
            postgresCreateSellRepository,
            idGeneratorAdapterStub
        );

        return sut;
    };
    test('should create sell sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(sell);

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

        const promise = sut.execute(sell.user_id);

        await expect(promise).rejects.toThrow(new Error('User with ID not found'));
    });

    test('should throw car with id provided not found', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetCarByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return null;
        });

        const promise = sut.execute(sell);

        await expect(promise).rejects.toThrow(new Error('Car with ID not found'));
    });

    test('should ensure PostgresGetUserByIdRepository is called', async () => {
        const sut = makeSut();

        const executeSpy = jest.spyOn(sut.postgresGetUserByIdRepository, 'execute');

        await sut.execute(sell);

        expect(executeSpy).toHaveBeenCalledWith(sell.user_id);
    });

    test('should ensure idGeneratorAdapter is called', async () => {
        const sut = makeSut();

        const idGeneratorSpy = jest.spyOn(sut.idGeneratorAdapter, 'execute');

        const createSellRepositorySpy = jest.spyOn(
            sut.postgresCreateSellRepository,
            'execute'
        );

        await sut.execute(sell);

        expect(idGeneratorSpy).toHaveBeenCalled();
        expect(createSellRepositorySpy).toHaveBeenCalledWith({
            ...sell,
            id: 'Generated_UUID',
        });
    });

    test('should ensure PostgresGetCarByIdRepository is called', async () => {
        const sut = makeSut();

        const executeSpy = jest.spyOn(sut.postgresGetCarByIdRepository, 'execute');

        await sut.execute(sell);

        expect(executeSpy).toHaveBeenCalledWith(sell.car_id);
    });

    test('should throw if idGeneratorAdapter throws', async () => {
        const sut = makeSut();

        jest.spyOn(sut.idGeneratorAdapter, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(sell);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if PostgresCreateSellRepository throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresCreateSellRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(sell);

        await expect(promise).rejects.toThrow();
    });
});
