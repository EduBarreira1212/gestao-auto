export class GetUserById {
    async execute(userId) {
        const getUserById = new GetUserById();

        const user = await getUserById.execute(userId);

        return user;
    }
}
