import { api } from '../../lib/axios';

const deleteExpense = async (expenseId: string, token: string) => {
    try {
        const response = await api.delete(`/expenses/${expenseId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteExpense;
