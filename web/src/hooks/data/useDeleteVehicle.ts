import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleMutationsKeys } from '../../keys/mutations';
import deleteCar from '../../services/car/deleteCar';
import { vehicleQueriesKeys } from '../../keys/queries';
import { VehicleType } from '../../types';
import { useAuth } from '@clerk/clerk-react';

export const useDeleteVehicle = (vehicleId: string) => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: vehicleMutationsKeys.deleteVehicle(vehicleId),
        mutationFn: async () => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await deleteCar(vehicleId, token);

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
