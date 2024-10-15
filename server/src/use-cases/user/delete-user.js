export class DeleteUserUseCase {
    constructor(postgresDeleteUserRepository, clerkClientAdapter) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository;
        this.clerkClientAdapter = clerkClientAdapter;
    }
    async execute(userId) {
        const deletedUser = await this.postgresDeleteUserRepository.execute(userId);

        if (!deletedUser) {
            throw new Error('User do not exists');
        }

        await this.clerkClientAdapter.deleteUser(deletedUser.external_id);

        return deletedUser;
    }
}
