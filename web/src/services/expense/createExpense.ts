import { api } from '../../lib/axios';
import { CreateExpense } from '../../types';

const createExpense = async (createExpenseParams: CreateExpense) => {
    try {
        const response = await api.post(`/expenses`, createExpenseParams);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createExpense;
