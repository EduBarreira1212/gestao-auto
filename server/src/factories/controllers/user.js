import { PostgresGetUserById } from '../../respositories/postgres/user/get-user-by-id.js';
import { GetUserByIdUseCase } from '../../use-cases/user/get-user-by-id.js';
import { GetUserByIdCrontroller } from '../../controllers/user/get-user-by-id.js';
import { PostgresGetUserByEmailRepositorie } from '../../respositories/postgres/user/get-user-by-email.js';
import { PostgresCreateUserRepositorie } from '../../respositories/postgres/user/create-user.js';
import { CreateUserUseCase } from '../../use-cases/user/create-user.js';
import { CreateUserController } from '../../controllers/user/create-user.js';
import { UpdateUserController } from '../../controllers/user/update-user.js';
import { DeleteUserController } from '../../controllers/user/delete-user.js';
import { PostgresUpdateUserRepository } from '../../respositories/postgres/user/update-user.js';
import { UpdateUserUseCase } from '../../use-cases/user/update-user.js';
import { PostgresDeleteUserRepository } from '../../respositories/postgres/user/delete-user.js';
import { DeleteUserUseCase } from '../../use-cases/user/delete-user.js';
import { PasswordHasherAdapter } from '../../adapters/password-hasher.js';
import { IdGeneratorAdapter } from '../../adapters/id-generator.js';
import { ClerkClientAdapter } from '../../adapters/clerk-client.js';

export const makeGetUserByIdController = () => {
    const postgresGetUserById = new PostgresGetUserById();

    const getUserByIdUseCase = new GetUserByIdUseCase(postgresGetUserById);

    const getUserById = new GetUserByIdCrontroller(getUserByIdUseCase);

    return getUserById;
};

export const makeCreateUserController = () => {
    const postgresGetUserByEmail = new PostgresGetUserByEmailRepositorie();
    const postgresCreateUserRepositorie = new PostgresCreateUserRepositorie();
    const passwordHasherAdapter = new PasswordHasherAdapter();
    const idGeneratorAdapter = new IdGeneratorAdapter();
    const clientClerkAdapter = new ClerkClientAdapter();

    const createUserUseCase = new CreateUserUseCase(
        postgresGetUserByEmail,
        postgresCreateUserRepositorie,
        passwordHasherAdapter,
        idGeneratorAdapter,
        clientClerkAdapter
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeUpdateUserController = () => {
    const postgresGetUserByEmail = new PostgresGetUserByEmailRepositorie();
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
    const passwordHasherAdapter = new PasswordHasherAdapter();
    const clientClerkAdapter = new ClerkClientAdapter();

    const updateUserUseCase = new UpdateUserUseCase(
        postgresGetUserByEmail,
        postgresUpdateUserRepository,
        passwordHasherAdapter,
        clientClerkAdapter
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);

    return updateUserController;
};

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
    const clientClerkAdapter = new ClerkClientAdapter();

    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
        clientClerkAdapter
    );

    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    return deleteUserController;
};
