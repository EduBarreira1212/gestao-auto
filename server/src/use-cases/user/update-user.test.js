import { UpdateUserUseCase } from './update-user.js';

describe('UpdateUserUseCase', () => {
    const userId = 'valid_id';
    const user = {
        name: 'Eduardo',
        email: 'edu@gmail.com',
        password: '12345',
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

    const makeSut = () => {
        const postgresGetUserByEmailRepositoryStub =
            new PostgresGetUserByEmailRepositorieStub();

        const postgresUpdateUserRepositoryStub = new PostgresUpdateUserRepository();

        const passwordHasherAdapterStub = new PasswordHasherAdapterStub();

        const sut = new UpdateUserUseCase(
            postgresGetUserByEmailRepositoryStub,
            postgresUpdateUserRepositoryStub,
            passwordHasherAdapterStub
        );

        return sut;
    };
    test('should update user sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(userId, user);

        expect(result).toBeTruthy();
    });

    test('should throw a email already exists error', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetUserByEmailRepositorie,
            'execute'
        ).mockImplementationOnce(() => {
            return user;
        });

        const promise = sut.execute(userId, user);

        await expect(promise).rejects.toThrow(new Error('Email already in use'));
    });

    test('should ensure passwordHasherAdapter is called', async () => {
        const sut = makeSut();

        const userWithHashedPassword = {
            ...user,
            password: 'hashed_password',
        };

        const passwordHasherAdapterSpy = jest.spyOn(
            sut.passwordHasherAdapter,
            'execute'
        );

        const updateUserRepositorySpy = jest.spyOn(
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

        jest.spyOn(sut.passwordHasherAdapter, 'execute').mockImplementationOnce(
            () => {
                throw new Error();
            }
        );

        const promise = sut.execute(userId, user);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if postgresUpdateUserRepository throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresUpdateUserRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(userId, user);

        await expect(promise).rejects.toThrow();
    });
});
