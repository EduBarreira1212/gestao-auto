import { EmailAlreadyInUse } from '../../errors/user.js';

export class CreateUserUseCase {
    constructor(
        postgresGetUserByEmailRepositorie,
        postgresCreateUserRepositorie,
        passwordHasherAdapter,
        idGeneratorAdapter,
        clerkClientAdapter
    ) {
        this.postgresGetUserByEmailRepositorie = postgresGetUserByEmailRepositorie;
        this.postgresCreateUserRepositorie = postgresCreateUserRepositorie;
        this.passwordHasherAdapter = passwordHasherAdapter;
        this.idGeneratorAdapter = idGeneratorAdapter;
        this.clerkClientAdapter = clerkClientAdapter;
    }
    async execute(createUserParams) {
        const emailExists = await this.postgresGetUserByEmailRepositorie.execute(
            createUserParams.email
        );

        if (emailExists) {
            throw new EmailAlreadyInUse(createUserParams.email);
        }

        const userId = this.idGeneratorAdapter.execute();

        const encryptedPassword = this.passwordHasherAdapter.execute(
            createUserParams.password
        );

        const userCreatedAtClerk = await this.clerkClientAdapter.createUser({
            externalId: userId,
            firstName: createUserParams.name,
            emailAddress: [createUserParams.email],
            passwordDigest: encryptedPassword,
            passwordHasher: 'bcrypt',
        });

        const user = {
            ...createUserParams,
            id: userId,
            external_id: userCreatedAtClerk.id,
            password: encryptedPassword,
        };

        const userCreated = await this.postgresCreateUserRepositorie.execute(user);

        return userCreated;
    }
}
