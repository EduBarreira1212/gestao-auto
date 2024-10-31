import { api } from '../../lib/axios';

const deleteExpense = async (expenseId: string) => {
    try {
        const response = await api.delete(`/expenses/${expenseId}`);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteExpense;
