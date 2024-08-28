import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepositorie } from '../respositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepositorie } from '../respositories/postgres/get-user-by-email.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        const postgresGetUserByEmailRepositorie =
            new PostgresGetUserByEmailRepositorie();

        const emailExists = await postgresGetUserByEmailRepositorie.execute(
            createUserParams.email
        );

        if (emailExists) {
            throw new Error('Email already exists');
        }

        const userId = uuidv4();

        const encryptedPassword = bcrypt.hashSync(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            id: userId,
            password: encryptedPassword,
        };

        const postgresCreateUserRepositorie = new PostgresCreateUserRepositorie();

        const userCreated = await postgresCreateUserRepositorie.execute(user);

        return userCreated;
    }
}
