import { GetCarsByUserIdUseCase } from './get-cars-by-user-id.js';
import { carFixture as car } from '../../tests/fixtures/car.js';

describe('GetCarsByUserIdUseCase', () => {
    const userId = car.user_id;

    class PostgresGetUserByIdRepositorieStub {
        async execute(userId) {
            const userToReturn = {
                id: userId,
                name: 'valid_name',
                email: 'valid@gmail.com',
                password: 'valid_password',
            };
            return userToReturn;
        }
    }

    class PostgresGetCarsByUserIdRepositorieStub {
        async execute(userId) {
            const carWithUserId = {
                ...car,
                user_id: userId,
            };
            return [carWithUserId];
        }
    }

    const makeSut = () => {
        const postgresGetUserByIdRepositorieStub =
            new PostgresGetUserByIdRepositorieStub();

        const postgresGetCarsByUserIdRepositorieStub =
            new PostgresGetCarsByUserIdRepositorieStub();

        const sut = new GetCarsByUserIdUseCase(
            postgresGetUserByIdRepositorieStub,
            postgresGetCarsByUserIdRepositorieStub
        );

        return sut;
    };

    test('should get cars sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(userId);

        expect(result).toEqual([car]);
    });

    test('should return falsy if user do not exists', async () => {
        const sut = makeSut();

        import.meta.jest.spyOn(
            sut.postgresGetUserByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return null;
        });

        const promise = sut.execute(userId);

        await expect(promise).rejects.toThrow(new Error('User not exists'));
    });

    test('should ensure PostgresGetUserByIdRepository is called with correct params', async () => {
        const sut = makeSut();

        const getUserByIdRepository = import.meta.jest.spyOn(
            sut.postgresGetUserByIdRepository,
            'execute'
        );

        await sut.execute(userId);

        expect(getUserByIdRepository).toHaveBeenCalled();
        expect(getUserByIdRepository).toHaveBeenCalledWith(userId);
    });

    test('should ensure PostgresGetCarsByUserIdRepository is called with correct params', async () => {
        const sut = makeSut();

        const getCarsByUserIdRepository = import.meta.jest.spyOn(
            sut.postgresGetCarsByUserIdRepository,
            'execute'
        );

        await sut.execute(userId);

        expect(getCarsByUserIdRepository).toHaveBeenCalled();
        expect(getCarsByUserIdRepository).toHaveBeenCalledWith(userId);
    });

    test('should throw if PostgresGetUserByIdRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest.spyOn(
            sut.postgresGetUserByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(userId);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if PostgresGetCarsByUserIdRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest.spyOn(
            sut.postgresGetCarsByUserIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(userId);

        await expect(promise).rejects.toThrow();
    });
});
