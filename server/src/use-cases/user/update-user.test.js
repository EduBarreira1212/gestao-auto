import { UpdateUserUseCase } from './update-user.js';

import { userFixture } from '../../tests/fixtures/user.js';
import { EmailAlreadyInUse } from '../../errors/user.js';

describe('UpdateUserUseCase', () => {
    const userId = 'valid_id';
    const user = {
        ...userFixture,
        id: undefined,
    };

    class PostgresGetUserByEmailRepositorieStub {
        async execute() {
            return null;
        }
    }

    class PostgresUpdateUserRepository {
        async execute(newUser) {
            return newUser;
        }
    }

    class PasswordHasherAdapterStub {
        execute() {
            return 'hashed_password';
        }
    }

    class ClerkClientAdapterStub {
        updateUser(userId, userUpdated) {
            const userToReturn = {
                ...userUpdated,
                id: userId,
            };
            return userToReturn;
        }

        deleteEmail(emailId) {
            return emailId;
        }

        createEmail(emailParams) {
            return emailParams;
        }
    }

    const makeSut = () => {
        const postgresGetUserByEmailRepositoryStub =
            new PostgresGetUserByEmailRepositorieStub();

        const postgresUpdateUserRepositoryStub = new PostgresUpdateUserRepository();

        const passwordHasherAdapterStub = new PasswordHasherAdapterStub();

        const clerkClientAdapterStub = new ClerkClientAdapterStub();

        const sut = new UpdateUserUseCase(
            postgresGetUserByEmailRepositoryStub,
            postgresUpdateUserRepositoryStub,
            passwordHasherAdapterStub,
            clerkClientAdapterStub
        );

        return sut;
    };
    test('should update user sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(userId, user);

        expect(result).toBeTruthy();
    });

    test('should throw a email already in use error', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresGetUserByEmailRepositorie, 'execute')
            .mockImplementationOnce(() => {
                return user;
            });

        const promise = sut.execute(userId, user);

        await expect(promise).rejects.toThrow(new EmailAlreadyInUse(user.email));
    });

    test('should ensure passwordHasherAdapter is called', async () => {
        const sut = makeSut();

        const userWithHashedPassword = {
            ...user,
            password: 'hashed_password',
        };

        const passwordHasherAdapterSpy = import.meta.jest.spyOn(
            sut.passwordHasherAdapter,
            'execute'
        );

        const updateUserRepositorySpy = import.meta.jest.spyOn(
            sut.postgresUpdateUserRepository,
            'execute'
        );

        await sut.execute(userId, userWithHashedPassword);

        expect(passwordHasherAdapterSpy).toHaveBeenCalled();
        expect(updateUserRepositorySpy).toHaveBeenCalledWith(
            userId,
            userWithHashedPassword
        );
    });

    test('should throw if passwordHasherAdapter throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.passwordHasherAdapter, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(userId, user);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if postgresUpdateUserRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresUpdateUserRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(userId, user);

        await expect(promise).rejects.toThrow();
    });
});
