import { CreateUserUseCase } from './create-user.js';

import { userFixture } from '../../tests/fixtures/user.js';
import { EmailAlreadyInUse } from '../../errors/user.js';

describe('CreateUserUseCase', () => {
    const user = {
        ...userFixture,
        external_id: undefined,
        id: undefined,
    };
    class PostgresGetUserByEmailRepositorieStub {
        async execute() {
            return null;
        }
    }

    class PostgresCreateUserRepositorieStub {
        async execute(user) {
            return user;
        }
    }

    class PasswordHasherAdapterStub {
        execute() {
            return 'hashed_password';
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'Generated_UUID';
        }
    }

    class ClerkClientAdapterStub {
        createUser(user) {
            return { ...user, external_id: userFixture.external_id };
        }
    }

    const makeSut = () => {
        const postgresGetUserByEmailRepositorieStub =
            new PostgresGetUserByEmailRepositorieStub();
        const postgresCreateUserRepositorieStub =
            new PostgresCreateUserRepositorieStub();
        const passwordHasherAdapterStub = new PasswordHasherAdapterStub();
        const idGeneratorAdapterStub = new IdGeneratorAdapterStub();
        const clerkClientAdapterStub = new ClerkClientAdapterStub();

        const sut = new CreateUserUseCase(
            postgresGetUserByEmailRepositorieStub,
            postgresCreateUserRepositorieStub,
            passwordHasherAdapterStub,
            idGeneratorAdapterStub,
            clerkClientAdapterStub
        );

        return sut;
    };
    test('should create user sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(user);

        expect(result).toBeTruthy();
    });

    test('should throw a email already in use error', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresGetUserByEmailRepositorie, 'execute')
            .mockImplementationOnce(() => {
                return user;
            });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow(new EmailAlreadyInUse(user.email));
    });

    test('should ensure idGeneratorAdapter is called', async () => {
        const sut = makeSut();

        const idGeneratorSpy = import.meta.jest.spyOn(
            sut.idGeneratorAdapter,
            'execute'
        );

        const createUserRepositorySpy = import.meta.jest.spyOn(
            sut.postgresCreateUserRepositorie,
            'execute'
        );

        await sut.execute(user);

        expect(idGeneratorSpy).toHaveBeenCalled();
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            id: 'Generated_UUID',
            password: 'hashed_password',
        });
    });

    test('should ensure passwordHasherAdapter is called', async () => {
        const sut = makeSut();

        const passwordHasherAdapterSpy = import.meta.jest.spyOn(
            sut.passwordHasherAdapter,
            'execute'
        );

        const createUserRepositorySpy = import.meta.jest.spyOn(
            sut.postgresCreateUserRepositorie,
            'execute'
        );

        await sut.execute(user);

        expect(passwordHasherAdapterSpy).toHaveBeenCalled();
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            id: 'Generated_UUID',
            password: 'hashed_password',
        });
    });

    test('should throw if idGeneratorAdapter throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.idGeneratorAdapter, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if passwordHasherAdapter throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.passwordHasherAdapter, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if postgresCreateUserRepositorie throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresCreateUserRepositorie, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });
});
