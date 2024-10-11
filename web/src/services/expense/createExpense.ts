import axios from 'axios';

const createExpense = async (createExpenseParams: any) => {
    try {
        const response = await axios.post(
            `http://localhost:3000/api/expenses`,
            createExpenseParams
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createExpense;
