import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseMutationsKeys } from '../../keys/mutations';
import updateExpense from '../../services/expense/updateExpense';
import { UpdateExpense, VehicleType } from '../../types';
import { vehicleQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';

export const useUpdateExpense = (expenseId: string) => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: expenseMutationsKeys.updateExpense(expenseId),
        mutationFn: async (updateExpenseParams: UpdateExpense) => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await updateExpense(
                expenseId,
                updateExpenseParams,
                token
            );

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (updatedExpense) => {
            queryClient.setQueryData(
                vehicleQueriesKeys.getVehicles(),
                (oldData: VehicleType[]) => {
                    return oldData.map((vehicle) => {
                        if (vehicle.id === updatedExpense.car_id) {
                            const expenseList = vehicle.expenses.filter(
                                (expense) => {
                                    return expense.id !== updatedExpense.id;
                                }
                            );

                            const vehicleWithUpdatedExpense = {
                                ...vehicle,
                                expenses: [...expenseList, updatedExpense],
                            };

                            return vehicleWithUpdatedExpense;
                        }
                        return vehicle;
                    });
                }
            );
        },
    });
};
