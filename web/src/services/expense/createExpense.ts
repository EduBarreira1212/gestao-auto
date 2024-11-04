import { api } from '../../lib/axios';
import { CreateExpense } from '../../types';

const createExpense = async (createExpenseParams: CreateExpense, token: string) => {
    try {
        const response = await api.post(`/expenses`, createExpenseParams, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createExpense;
