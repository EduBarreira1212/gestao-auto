export class DeleteSellUseCase {
    constructor(postgresGetSellByIdRepository, postgresDeleteSellrepository) {
        this.postgresGetSellByIdRepository = postgresGetSellByIdRepository;
        this.postgresDeleteSellrepository = postgresDeleteSellrepository;
    }
    async execute(sellId) {
        const sell = await this.postgresGetSellByIdRepository.execute(sellId);

        if (!sell) {
            throw new Error('Sell do not exists');
        }

        const deletedSell = await this.postgresDeleteSellrepository.execute(sellId);

        return deletedSell;
    }
}
