import bcrypt from 'bcrypt';

export class UpdateUserUseCase {
    constructor(postgresGetUserByEmailRepositorie, postgresUpdateUserRepository) {
        this.postgresGetUserByEmailRepositorie = postgresGetUserByEmailRepositorie;
        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
    }
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.postgresGetUserByEmailRepositorie.execute(
                    updateUserParams.email
                );

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new Error('Email already in use');
            }
        }

        const user = { ...updateUserParams };

        if (updateUserParams.password) {
            const encryptedPassword = bcrypt.hashSync(updateUserParams.password, 10);

            user.password = encryptedPassword;
        }

        const updateUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user
        );

        return updateUser;
    }
}
