import { PostgresGetUserById } from '../../respositories/postgres/get-user-by-id.js';
import { GetUserByIdUseCase } from '../../use-cases/get-user-by-id.js';
import { GetUserByIdCrontroller } from '../../controllers/get-user-by-id.js';
import { PostgresGetUserByEmailRepositorie } from '../../respositories/postgres/get-user-by-email.js';
import { PostgresCreateUserRepositorie } from '../../respositories/postgres/create-user.js';
import { CreateUserUseCase } from '../../use-cases/create-user.js';
import { CreateUserController } from '../../controllers/create-user.js';
import { UpdateUserController } from '../../controllers/update-user.js';
import { DeleteUserController } from '../../controllers/delete-user.js';
import { PostgresUpdateUserRepository } from '../../respositories/postgres/update-user.js';
import { UpdateUserUseCase } from '../../use-cases/update-user.js';
import { PostgresDeleteUserRepository } from '../../respositories/postgres/delete-user.js';
import { DeleteUserUseCase } from '../../use-cases/delete-user.js';

export const makeGetUserByIdController = () => {
    const postgresGetUserById = new PostgresGetUserById();

    const getUserByIdUseCase = new GetUserByIdUseCase(postgresGetUserById);

    const getUserById = new GetUserByIdCrontroller(getUserByIdUseCase);

    return getUserById;
};

export const makeCreateUserController = () => {
    const postgresGetUserByEmail = new PostgresGetUserByEmailRepositorie();
    const postgresCreateUserRepositorie = new PostgresCreateUserRepositorie();

    const createUserUseCase = new CreateUserUseCase(
        postgresGetUserByEmail,
        postgresCreateUserRepositorie
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeUpdateUserController = () => {
    const postgresGetUserByEmail = new PostgresGetUserByEmailRepositorie();
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        postgresGetUserByEmail,
        postgresUpdateUserRepository
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);

    return updateUserController;
};

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(postgresDeleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    return deleteUserController;
};
