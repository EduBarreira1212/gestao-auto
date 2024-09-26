export class CreateExpenseUseCase {
    constructor(getCarByIdRepository, idGeneratorAdapter, createExpenseRepository) {
        this.getCarByIdRepository = getCarByIdRepository;
        this.idGeneratorAdapter = idGeneratorAdapter;
        this.createExpenseRepository = createExpenseRepository;
    }
    async execute(createExpenseParams) {
        const carId = createExpenseParams.car_id;

        const carExists = await this.getCarByIdRepository.execute(carId);

        if (!carExists) {
            throw new Error('Car with provided ID do not exists');
        }

        const expenseId = this.idGeneratorAdapter.execute();

        const expense = {
            ...createExpenseParams,
            id: expenseId,
        };

        const expenseCreated = await this.createExpenseRepository.execute(expense);

        return expenseCreated;
    }
}
