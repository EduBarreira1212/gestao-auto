export class DeleteExpenseUseCase {
    constructor(getExpenseByIdRepository, deleteExpenseRespository) {
        this.getExpenseByIdRepository = getExpenseByIdRepository;
        this.deleteExpenseRespository = deleteExpenseRespository;
    }
    async execute(expenseId) {
        const expenseWithProvidedIdExists =
            await this.getExpenseByIdRepository.execute(expenseId);

        if (!expenseWithProvidedIdExists) {
            throw new Error('Expense with provided id do not exists');
        }

        const deletedExpense =
            await this.deleteExpenseRespository.execute(expenseId);

        return deletedExpense;
    }
}
