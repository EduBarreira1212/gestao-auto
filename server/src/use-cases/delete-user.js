import { PostgresDeleteUserRepository } from '../respositories/postgres/delete-user.js';

export class DeleteUSerUseCase {
    async execute(userId) {
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

        const deletedUser = postgresDeleteUserRepository.execute(userId);

        return deletedUser;
    }
}
