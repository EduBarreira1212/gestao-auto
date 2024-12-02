export class GetLeadsByUserIdUseCase {
    constructor(postgresGetUserByIdRepository, postgresGetLeadsByUserIdRepository) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresGetLeadsByUserIdRepository = postgresGetLeadsByUserIdRepository;
    }

    async execute(userId) {
        const user = await this.postgresGetUserByIdRepository.execute(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const leads = await this.postgresGetLeadsByUserIdRepository.execute(userId);

        return leads;
    }
}
