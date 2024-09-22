import { DeleteUserUseCase } from './delete-user.js';

import { userFixture as user } from '../../tests/fixtures/user.js';

describe('DeleteUserUseCase', () => {
    class PostgresDeleteUSerRepositorieStub {
        async execute(userId) {
            const userToReturn = {
                ...user,
                id: userId,
            };
            return userToReturn;
        }
    }

    const makeSut = () => {
        const postgresDeleteUserRepositorieStub =
            new PostgresDeleteUSerRepositorieStub();

        const sut = new DeleteUserUseCase(postgresDeleteUserRepositorieStub);

        return sut;
    };
    test('should delete user sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(user.id);

        expect(result).toStrictEqual(user);
    });

    test('should throw a email already exists error', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresDeleteUserRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const result = await sut.execute(user);

        expect(result).toBeFalsy();
    });

    test('should ensure PostgresDeleteUserRepository is called', async () => {
        const sut = makeSut();

        const deleteUserRepository = import.meta.jest.spyOn(
            sut.postgresDeleteUserRepository,
            'execute'
        );

        await sut.execute(user.id);

        expect(deleteUserRepository).toHaveBeenCalled();
        expect(deleteUserRepository).toHaveBeenCalledWith(user.id);
    });

    test('should throw if postgresDeleteUserRepositorie throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresDeleteUserRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });
});
