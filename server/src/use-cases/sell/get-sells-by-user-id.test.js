import { GetSellsByUserIdUseCase } from './get-sells-by-user-id.js';
import { sellFixture as sell } from '../../tests/fixtures/sell.js';

describe('GetSellsByUserIdUseCase', () => {
    const userId = '6625edd1-2b56-42f9-84b4-2f86ba234c41';

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

    class PostgresGetSellsByUserIdRepositorieStub {
        async execute(userId) {
            const sellWithUserId = {
                ...sell,
                user_id: userId,
            };
            return [sellWithUserId];
        }
    }

    const makeSut = () => {
        const postgresGetUserByIdRepositorieStub =
            new PostgresGetUserByIdRepositorieStub();

        const postgresGetSellsByUserIdRepositorieStub =
            new PostgresGetSellsByUserIdRepositorieStub();

        const sut = new GetSellsByUserIdUseCase(
            postgresGetUserByIdRepositorieStub,
            postgresGetSellsByUserIdRepositorieStub
        );

        return sut;
    };

    test('should get cars sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(userId);

        expect(result).toEqual([sell]);
    });

    test('should return falsy if user do not exists', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetUserByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return null;
        });

        const promise = sut.execute(userId);

        await expect(promise).rejects.toThrow(new Error('User not found'));
    });

    test('should ensure PostgresGetUserByIdRepository is called with correct params', async () => {
        const sut = makeSut();

        const getUserByIdRepository = jest.spyOn(
            sut.postgresGetUserByIdRepository,
            'execute'
        );

        await sut.execute(userId);

        expect(getUserByIdRepository).toHaveBeenCalled();
        expect(getUserByIdRepository).toHaveBeenCalledWith(userId);
    });

    test('should ensure PostgresGetSellsByUserIdRepository is called with correct params', async () => {
        const sut = makeSut();

        const getCarsByUserIdRepository = jest.spyOn(
            sut.postgresGetSellsByUserIdRepository,
            'execute'
        );

        await sut.execute(userId);

        expect(getCarsByUserIdRepository).toHaveBeenCalled();
        expect(getCarsByUserIdRepository).toHaveBeenCalledWith(userId);
    });

    test('should throw if PostgresGetUserByIdRepository throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetUserByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(userId);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if PostgresGetSellsByUserIdRepository throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetSellsByUserIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(userId);

        await expect(promise).rejects.toThrow();
    });
});
