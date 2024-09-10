export class CreateUserUseCase {
    constructor(
        postgresGetUserByEmailRepositorie,
        postgresCreateUserRepositorie,
        passwordHasherAdapter,
        idGeneratorAdapter
    ) {
        this.postgresGetUserByEmailRepositorie = postgresGetUserByEmailRepositorie;
        this.postgresCreateUserRepositorie = postgresCreateUserRepositorie;
        this.passwordHasherAdapter = passwordHasherAdapter;
        this.idGeneratorAdapter = idGeneratorAdapter;
    }
    async execute(createUserParams) {
        const emailExists = await this.postgresGetUserByEmailRepositorie.execute(
            createUserParams.email
        );

        if (emailExists) {
            throw new Error('Email already exists');
        }

        const userId = this.idGeneratorAdapter.execute();

        const encryptedPassword = this.passwordHasherAdapter.execute(
            createUserParams.password
        );

        const user = {
            ...createUserParams,
            id: userId,
            password: encryptedPassword,
        };

        const userCreated = await this.postgresCreateUserRepositorie.execute(user);

        return userCreated;
    }
}
