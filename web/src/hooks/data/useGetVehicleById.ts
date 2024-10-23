import { useQuery } from '@tanstack/react-query';
import getCarById from '../../services/car/getCarById';
import { vehicleQueriesKeys } from '../../keys/queries';

export const useGetVehicleById = (vehicleId: string) => {
    return useQuery({
        queryKey: vehicleQueriesKeys.getVehicleById(vehicleId),
        queryFn: async () => {
            const response = await getCarById(vehicleId);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
    });
};
