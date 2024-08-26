import { PostgresCreateUserRepositorie } from '../respositories/postgres/create-user';

export class CreateUserUseCase {
    async execute(createUserParams) {
        const postgresCreateUserRepositorie = new PostgresCreateUserRepositorie();
        const userCreated =
            await postgresCreateUserRepositorie.execute(createUserParams);
        return userCreated;
    }
}
