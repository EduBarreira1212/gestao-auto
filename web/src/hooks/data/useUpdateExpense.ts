import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseMutationsKeys } from '../../keys/mutations';
import updateExpense from '../../services/expense/updateExpense';
import { UpdateExpense, VehicleType } from '../../types';
import { vehicleQueriesKeys } from '../../keys/queries';

export const useUpdateExpense = (expenseId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: expenseMutationsKeys.updateExpense(expenseId),
        mutationFn: async (updateExpenseParams: UpdateExpense) => {
            const response = await updateExpense(expenseId, updateExpenseParams);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (updatedExpense) => {
            queryClient.setQueryData(
                vehicleQueriesKeys.getVehicles(),
                (oldData: VehicleType[]) => {
                    const indexOfVehicle = oldData.findIndex((vehicle) => {
                        return vehicle.id === updatedExpense.car_id;
                    });

                    if (indexOfVehicle === -1) return oldData;

                    const updatedVehicle = {
                        ...oldData[indexOfVehicle],
                        expenses: [
                            ...oldData[indexOfVehicle].expenses,
                            updatedExpense,
                        ],
                    };

                    return [
                        ...oldData.slice(0, indexOfVehicle),
                        updatedVehicle,
                        ...oldData.slice(indexOfVehicle + 1),
                    ];
                }
            );
        },
    });
};
