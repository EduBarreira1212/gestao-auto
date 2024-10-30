import { useMutation, useQueryClient } from '@tanstack/react-query';
import createExpense from '../../services/expense/createExpense';
import { CreateExpense, VehicleType } from '../../types';
import { vehicleQueriesKeys } from '../../keys/queries';
import { expenseMutationsKeys } from '../../keys/mutations';

export const useAddExpenses = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: expenseMutationsKeys.addExpense(),
        mutationFn: async (createExpenseParams: CreateExpense) => {
            const response = await createExpense(createExpenseParams);

            if (response?.status !== 201) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (newExpense) => {
            queryClient.setQueryData(
                vehicleQueriesKeys.getVehicles(),
                (oldData: VehicleType[]) => {
                    const indexOfVehicle = oldData.findIndex((vehicle) => {
                        return vehicle.id === newExpense.car_id;
                    });

                    if (indexOfVehicle === -1) return oldData;

                    const updatedVehicle = {
                        ...oldData[indexOfVehicle],
                        expenses: [...oldData[indexOfVehicle].expenses, newExpense],
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
