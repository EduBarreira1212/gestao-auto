import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export class CreateUserUseCase {
    constructor(postgresGetUserByEmailRepositorie, postgresCreateUserRepositorie) {
        this.postgresGetUserByEmailRepositorie = postgresGetUserByEmailRepositorie;
        this.postgresCreateUserRepositorie = postgresCreateUserRepositorie;
    }
    async execute(createUserParams) {
        const emailExists = await this.postgresGetUserByEmailRepositorie.execute(
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

        const userCreated = await this.postgresCreateUserRepositorie.execute(user);

        return userCreated;
    }
}
