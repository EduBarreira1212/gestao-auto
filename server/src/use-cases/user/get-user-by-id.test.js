import { GetUserByIdUseCase } from './get-user-by-id.js';

import { userFixture as user } from '../../tests/fixtures/user.js';

describe('GetUserByIdUseCase', () => {
    class PostgresGetUserByIdRepositorieStub {
        async execute(userId) {
            const userToReturn = {
                ...user,
                id: userId,
            };
            return userToReturn;
        }
    }

    const makeSut = () => {
        const postgresGetUserByIdRepositoryStub =
            new PostgresGetUserByIdRepositorieStub();

        const sut = new GetUserByIdUseCase(postgresGetUserByIdRepositoryStub);

        return sut;
    };

    test('should get user sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(user.id);

        expect(result).toStrictEqual(user);
    });

    test('should return falsy if user do no exists', async () => {
        const sut = makeSut();

        jest.spyOn(sut.postgresGetUserById, 'execute').mockImplementationOnce(() => {
            return null;
        });

        const result = await sut.execute(user);

        expect(result).toBeFalsy();
    });

    test('should ensure PostgresGetUserById is called', async () => {
        const sut = makeSut();

        const getUserByIdRepository = jest.spyOn(sut.postgresGetUserById, 'execute');

        await sut.execute(user.id);

        expect(getUserByIdRepository).toHaveBeenCalled();
        expect(getUserByIdRepository).toHaveBeenCalledWith(user.id);
    });

    test('should throw if postgresDeleteUserRepositorie throws', async () => {
        const sut = makeSut();

        jest.spyOn(sut.postgresGetUserById, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });
});
