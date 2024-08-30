export class GetUserByIdUseCase {
    constructor(postgresGetUserById) {
        this.postgresGetUserById = postgresGetUserById;
    }
    async execute(userId) {
        const user = await this.postgresGetUserById.execute(userId);

        return user;
    }
}
