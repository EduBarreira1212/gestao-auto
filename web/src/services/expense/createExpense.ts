import axios from 'axios';
import { CreateExpense } from '../../types';

const createExpense = async (createExpenseParams: CreateExpense) => {
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
