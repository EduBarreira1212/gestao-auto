import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateVehicle, VehicleType } from '../../types';
import createCar from '../../services/car/createCar';
import { vehicleMutationsKeys } from '../../keys/mutations';
import { vehicleQueriesKeys } from '../../keys/queries';

export const useAddVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: vehicleMutationsKeys.addVehicle(),
        mutationFn: async (vehicleData: CreateVehicle) => {
            const response = await createCar(vehicleData);

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
                    return [...oldData, newVehicle];
                }
            );
        },
    });
};
