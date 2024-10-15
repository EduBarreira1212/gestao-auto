export class DeleteUserUseCase {
    constructor(postgresDeleteUserRepository, clerkClientAdapter) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository;
        this.clerkClientAdapter = clerkClientAdapter;
    }
    async execute(userId) {
        const deletedUser = await this.postgresDeleteUserRepository.execute(userId);

        await this.clerkClientAdapter.deleteUser(deletedUser.external_id);

        return deletedUser;
    }
}
