import { UserNotFound } from '../../errors/user.js';

export class DeleteUserUseCase {
    constructor(postgresDeleteUserRepository, clerkClientAdapter) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository;
        this.clerkClientAdapter = clerkClientAdapter;
    }
    async execute(userId) {
        const deletedUser = await this.postgresDeleteUserRepository.execute(userId);

        if (!deletedUser) {
            throw new UserNotFound(userId);
        }

        await this.clerkClientAdapter.deleteUser(deletedUser.external_id);

        return deletedUser;
    }
}
