import { api } from '../../lib/axios';

const getExpenseById = async (expenseId: string) => {
    try {
        const response = await api.get(`/expenses/${expenseId}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getExpenseById;
