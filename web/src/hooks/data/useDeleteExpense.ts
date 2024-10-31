import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseMutationsKeys } from '../../keys/mutations';
import deleteExpense from '../../services/expense/deleteExpense';
import { vehicleQueriesKeys } from '../../keys/queries';
import { VehicleType } from '../../types';

export const useDeleteExpense = (expenseId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: expenseMutationsKeys.deleteExpense(expenseId),
        mutationFn: async () => {
            const response = await deleteExpense(expenseId);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (deletedExpense) => {
            queryClient.setQueryData(
                vehicleQueriesKeys.getVehicles(),
                (oldData: VehicleType[]) => {
                    return oldData.map((vehicle) => {
                        if (vehicle.id === deletedExpense.car_id) {
                            const expenseList = vehicle.expenses.filter(
                                (expense) => {
                                    return expense.id !== deletedExpense.id;
                                }
                            );

                            const vehicleWithExpenses = {
                                ...vehicle,
                                expenses: expenseList,
                            };

                            return vehicleWithExpenses;
                        }

                        return vehicle;
                    });
                }
            );
        },
    });
};
