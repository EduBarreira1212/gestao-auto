import { useMutation } from '@tanstack/react-query';
import createExpense from '../../services/expense/createExpense';
import { CreateExpense } from '../../types';

export const useAddExpenses = () => {
    return useMutation({
        mutationKey: ['addExpense'],
        mutationFn: async (createExpenseParams: CreateExpense) => {
            const response = await createExpense(createExpenseParams);

            if (response?.status !== 201) {
                throw new Error();
            }

            return response.data;
        },
    });
};
