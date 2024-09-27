export class GetExpensesByCarIdUseCase {
    constructor(getCarByIdRepository, getExpensesByCarIdRepository) {
        this.getCarByIdRepository = getCarByIdRepository;
        this.getExpensesByCarIdRepository = getExpensesByCarIdRepository;
    }
    async execute(carId) {
        const carWithProvidedIdExists =
            await this.getCarByIdRepository.execute(carId);

        if (!carWithProvidedIdExists) {
            throw new Error('Car with provided ID do not exists');
        }

        const expenses = await this.getExpensesByCarIdRepository.execute(carId);

        return expenses;
    }
}
