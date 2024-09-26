export class GetExpenseByIdUseCase {
    constructor(getExpenseByIdRepository) {
        this.getExpenseByIdRepository = getExpenseByIdRepository;
    }
    async execute(expenseId) {
        const expense = await this.getExpenseByIdRepository.execute(expenseId);

        return expense;
    }
}
