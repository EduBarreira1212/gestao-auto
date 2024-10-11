import axios from 'axios';

const updateExpense = async (expenseId: string, updateExpenseParams: any) => {
    try {
        const response = await axios.patch(
            `http://localhost:3000/api/expenses/${expenseId}`,
            updateExpenseParams
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateExpense;
