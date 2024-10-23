import { useQuery } from '@tanstack/react-query';
import getCarsByUserId from '../../services/car/getCarsByUserId';

export const useGetVehicles = (userExternalId: string) => {
    return useQuery({
        queryKey: ['vehicles'],
        queryFn: async () => {
            const response = await getCarsByUserId(userExternalId);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response?.data;
        },
    });
};
