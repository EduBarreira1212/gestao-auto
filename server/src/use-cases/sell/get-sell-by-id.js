export class GetSellByIdUseCase {
    constructor(postgresGetSellByIdRepository) {
        this.postgresGetSellByIdRepository = postgresGetSellByIdRepository;
    }
    async execute(sellId) {
        const sell = await this.postgresGetSellByIdRepository.execute(sellId);

        return sell;
    }
}
