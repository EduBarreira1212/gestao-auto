export class UpdateSellUseCase {
    constructor(postgresGetSellByIdRepository, postgresUpdateSellRepository) {
        this.postgresGetSellByIdRepository = postgresGetSellByIdRepository;
        this.postgresUpdateSellRepository = postgresUpdateSellRepository;
    }
    async execute(sellId, updateSellParams) {
        const sellWithProvidedId =
            await this.postgresGetSellByIdRepository.execute(sellId);

        if (!sellWithProvidedId) {
            throw new Error('Sell not found');
        }

        const updatedSell = await this.postgresUpdateSellRepository.execute(
            sellId,
            updateSellParams
        );

        return updatedSell;
    }
}
