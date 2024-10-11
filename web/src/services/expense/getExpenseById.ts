import axios from 'axios';

const getExpenseById = async (expenseId: string) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/expenses/${expenseId}`
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getExpenseById;
