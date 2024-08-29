import bcrypt from 'bcrypt';

import { PostgresGetUserByEmailRepositorie } from '../respositories/postgres/get-user-by-email.js';
import { PostgresUpdateUserRepository } from '../respositories/postgres/update-user.js';

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const postgresGetUserByEmail = new PostgresGetUserByEmailRepositorie();

            const userWithProvidedEmail = await postgresGetUserByEmail.execute(
                updateUserParams.email
            );

            if (!userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new Error('Email already in use');
            }
        }

        const user = { ...updateUserParams };

        if (updateUserParams.password) {
            const encryptedPassword = bcrypt.hashSync(updateUserParams.password, 10);

            user.password = encryptedPassword;
        }

        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

        const updateUser = await postgresUpdateUserRepository.execute(userId, user);

        return updateUser;
    }
}
