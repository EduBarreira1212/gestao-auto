export class UpdateUserUseCase {
    constructor(
        postgresGetUserByEmailRepositorie,
        postgresUpdateUserRepository,
        passwordHasherAdapter
    ) {
        this.postgresGetUserByEmailRepositorie = postgresGetUserByEmailRepositorie;
        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
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
            const encryptedPassword = this.passwordHasherAdapter.execute(
                updateUserParams.password
            );

            user.password = encryptedPassword;
        }

        const updateUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user
        );

        return updateUser;
    }
}
