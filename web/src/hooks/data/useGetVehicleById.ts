import { useQuery } from '@tanstack/react-query';
import getCarById from '../../services/car/getCarById';
import { vehicleQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';

export const useGetVehicleById = (vehicleId: string) => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: vehicleQueriesKeys.getVehicleById(vehicleId),
        queryFn: async () => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await getCarById(vehicleId, token);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
    });
};
