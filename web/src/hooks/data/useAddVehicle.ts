import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VehicleType } from '../../types';
import createCar from '../../services/car/createCar';
import { vehicleMutationsKeys } from '../../keys/mutations';
import { vehicleQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';

export const useAddVehicle = () => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: vehicleMutationsKeys.addVehicle(),
        mutationFn: async (vehicleData: FormData) => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await createCar(vehicleData, token);

            if (response?.status !== 201) {
                throw new Error();
            }

            const newVehicle = response.data;

            return newVehicle;
        },
        onSuccess: (newVehicle) => {
            queryClient.setQueryData(
                vehicleQueriesKeys.getVehicles(),
                (oldData: VehicleType[]) => {
                    const newVehicleWithExpense = {
                        ...newVehicle,
                        expenses: [],
                    };

                    return [...oldData, newVehicleWithExpense];
                }
            );
        },
    });
};
