import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { userQueriesKeys } from '../../keys/queries';
import getUserById from '../../services/user/getUserById';

export const useGetUserById = (userExternalId: string) => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: userQueriesKeys.getUserById(userExternalId),
        queryFn: async () => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await getUserById(userExternalId, token);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
    });
};
