export class UpdateExpenseUseCase {
    constructor(getExpenseByIdRepository, updateExpenseRepository) {
        this.getExpenseByIdRepository = getExpenseByIdRepository;
        this.updateExpenseRepository = updateExpenseRepository;
    }
    async execute(expenseId, updateExpenseParams) {
        const expenseWithProvidedIdExists =
            await this.getExpenseByIdRepository.execute(expenseId);

        if (!expenseWithProvidedIdExists) {
            throw new Error('Expense with provided ID do not exists');
        }

        const expenseUpdated = await this.updateExpenseRepository.execute(
            expenseId,
            updateExpenseParams
        );

        return expenseUpdated;
    }
}
