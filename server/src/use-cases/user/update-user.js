import { EmailAlreadyInUse } from '../../errors/user.js';

export class UpdateUserUseCase {
    constructor(
        postgresGetUserByEmailRepositorie,
        postgresUpdateUserRepository,
        passwordHasherAdapter,
        clerkClientAdapter
    ) {
        this.postgresGetUserByEmailRepositorie = postgresGetUserByEmailRepositorie;
        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
        this.clerkClientAdapter = clerkClientAdapter;
    }
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.postgresGetUserByEmailRepositorie.execute(
                    updateUserParams.email
                );

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUse(updateUserParams.email);
            }

            if (userWithProvidedEmail && userWithProvidedEmail.id === userId) {
                updateUserParams.email = undefined;
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

        const clerkUpdatedUser = await this.clerkClientAdapter.updateUser(
            updateUser.external_id,
            {
                firstName: updateUser.name,
                passwordDigest: updateUser.password,
                passwordHasher: 'bcrypt',
            }
        );

        if (user.email) {
            await this.clerkClientAdapter.createEmail({
                userId: updateUser.external_id,
                emailAddress: updateUser.email,
                primary: true,
                verified: true,
            });

            await this.clerkClientAdapter.deleteEmail(
                clerkUpdatedUser.primaryEmailAddressId
            );
        }

        return updateUser;
    }
}
