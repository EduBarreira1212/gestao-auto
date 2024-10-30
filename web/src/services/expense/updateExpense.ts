import { api } from '../../lib/axios';
import { UpdateExpense } from '../../types';

const updateExpense = async (
    expenseId: string,
    updateExpenseParams: UpdateExpense
) => {
    try {
        const response = await api.patch(
            `/expenses/${expenseId}`,
            updateExpenseParams
        );

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateExpense;
