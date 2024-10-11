import axios from 'axios';

const deleteExpense = async (expenseId: string) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/api/expenses/${expenseId}`
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteExpense;
