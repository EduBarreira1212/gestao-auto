import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleMutationsKeys } from '../../keys/mutations';
import deleteCar from '../../services/car/deleteCar';
import { vehicleQueriesKeys } from '../../keys/queries';
import { VehicleType } from '../../types';

export const useDeleteVehicle = (vehicleId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: vehicleMutationsKeys.deleteVehicle(vehicleId),
        mutationFn: async () => {
            const response = await deleteCar(vehicleId);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response?.data;
        },
        onSuccess: (deletedVehicle: VehicleType) => {
            queryClient.setQueryData(
                vehicleQueriesKeys.getVehicles(),
                (oldData: VehicleType[]) => {
                    return oldData.filter((vehicle) => {
                        return vehicle.id !== deletedVehicle.id;
                    });
                }
            );
        },
    });
};
