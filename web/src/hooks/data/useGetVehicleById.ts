import { useQuery } from '@tanstack/react-query';
import getCarById from '../../services/car/getCarById';

export const useGetVehicleById = (vehicleId: string) => {
    return useQuery({
        queryKey: ['vehicle', vehicleId],
        queryFn: async () => {
            const response = await getCarById(vehicleId);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
    });
};
