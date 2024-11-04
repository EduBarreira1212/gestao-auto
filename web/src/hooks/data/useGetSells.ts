import { useQuery } from '@tanstack/react-query';
import getSellsByUserId from '../../services/sell/getSellsByUserId';
import { sellQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';

export const useGetSells = (userExternalId: string) => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: sellQueriesKeys.getSells(),
        queryFn: async () => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await getSellsByUserId(userExternalId, token);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
    });
};
