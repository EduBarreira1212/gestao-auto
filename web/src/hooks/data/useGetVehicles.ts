import { useQuery } from '@tanstack/react-query';
import getCarsByUserId from '../../services/car/getCarsByUserId';
import { vehicleQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';

export const useGetVehicles = (userExternalId: string) => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: vehicleQueriesKeys.getVehicles(),
        queryFn: async () => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await getCarsByUserId(userExternalId, token);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response?.data;
        },
    });
};
