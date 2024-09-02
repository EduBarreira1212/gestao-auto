export class GetCarsByUserIdUseCase {
    constructor(postgresGetUserByIdRepository, postgresGetCarsByUserIdRepository) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresGetCarsByUserIdRepository = postgresGetCarsByUserIdRepository;
    }
    async execute(userId) {
        const userWithIdProvidedExists =
            await this.postgresGetUserByIdRepository.execute(userId);

        if (!userWithIdProvidedExists) {
            throw new Error('User not exists');
        }

        const cars = await this.postgresGetCarsByUserIdRepository.execute(userId);

        return cars;
    }
}
