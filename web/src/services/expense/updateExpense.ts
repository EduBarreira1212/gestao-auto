import { api } from '../../lib/axios';
import { UpdateExpense } from '../../types';

const updateExpense = async (
    expenseId: string,
    updateExpenseParams: UpdateExpense,
    token: string
) => {
    try {
        const response = await api.patch(
            `/expenses/${expenseId}`,
            updateExpenseParams,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateExpense;
