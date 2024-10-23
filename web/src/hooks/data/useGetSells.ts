import { useQuery } from '@tanstack/react-query';
import getSellsByUserId from '../../services/sell/getSellsByUserId';

export const useGetSells = (userExternalId: string) => {
    return useQuery({
        queryKey: ['sells'],
        queryFn: async () => {
            const response = await getSellsByUserId(userExternalId);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
    });
};
