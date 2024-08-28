import { PostgresGetUserById } from '../respositories/postgres/get-user-by-id.js';

export class GetUserById {
    async execute(userId) {
        const getUserById = new PostgresGetUserById();

        const user = await getUserById.execute(userId);

        return user;
    }
}
