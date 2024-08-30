import express from 'express';
import dotenv from 'dotenv';

import { CreateUserController } from './controllers/create-user.js';
import { GetUserByIdCrontroller } from './controllers/get-user-by-id.js';
import { UpdateUserController } from './controllers/update-user.js';
import { DeleteUserController } from './controllers/delete-user.js';
import { PostgresGetUserByEmailRepositorie } from './respositories/postgres/get-user-by-email.js';
import { PostgresCreateUserRepositorie } from './respositories/postgres/create-user.js';
import { CreateUserUseCase } from './use-cases/create-user.js';
import { PostgresGetUserById } from './respositories/postgres/get-user-by-id.js';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.js';
import { PostgresUpdateUserRepository } from './respositories/postgres/update-user.js';
import { UpdateUserUseCase } from './use-cases/update-user.js';
import { PostgresDeleteUserRepository } from './respositories/postgres/delete-user.js';
import { DeleteUserUseCase } from './use-cases/delete-user.js';

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());

app.get('/api/get-user/:userId', async (req, res) => {
    const postgresGetUserById = new PostgresGetUserById();

    const getUserByIdUseCase = new GetUserByIdUseCase(postgresGetUserById);

    const getUserById = new GetUserByIdCrontroller(getUserByIdUseCase);

    const { statusCode, body } = await getUserById.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/create-user', async (req, res) => {
    const postgresGetUserByEmail = new PostgresGetUserByEmailRepositorie();
    const postgresCreateUserRepositorie = new PostgresCreateUserRepositorie();

    const createUserUseCase = new CreateUserUseCase(
        postgresGetUserByEmail,
        postgresCreateUserRepositorie
    );

    const createUserController = new CreateUserController(createUserUseCase);

    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

app.patch('/api/update-user/:userId', async (req, res) => {
    const postgresGetUserByEmail = new PostgresGetUserByEmailRepositorie();
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        postgresGetUserByEmail,
        postgresUpdateUserRepository
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);

    const { statusCode, body } = await updateUserController.execute(req);

    res.status(statusCode).send(body);
});

app.delete('/api/delete-user/:userId', async (req, res) => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(postgresDeleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    const { statusCode, body } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
