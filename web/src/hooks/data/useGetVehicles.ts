import { useQuery } from '@tanstack/react-query';
import getCarsByUserId from '../../services/car/getCarsByUserId';
import { vehicleQueriesKeys } from '../../keys/queries';

export const useGetVehicles = (userExternalId: string) => {
    return useQuery({
        queryKey: vehicleQueriesKeys.getVehicles(),
        queryFn: async () => {
            const response = await getCarsByUserId(userExternalId);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response?.data;
        },
    });
};
