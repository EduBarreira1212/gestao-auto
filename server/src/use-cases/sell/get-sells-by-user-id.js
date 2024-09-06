export class GetSellsByUserIdUseCase {
    constructor(postgresGetUserByIdRepository, postgresGetSellsByUserIdRepository) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresGetSellsByUserIdRepository = postgresGetSellsByUserIdRepository;
    }
    async execute(userId) {
        const userWithProvidedId =
            await this.postgresGetUserByIdRepository.execute(userId);

        if (!userWithProvidedId) {
            throw new Error('User not found');
        }

        const sells = await this.postgresGetSellsByUserIdRepository.execute(userId);

        return sells;
    }
}
