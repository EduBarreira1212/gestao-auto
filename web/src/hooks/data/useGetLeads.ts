import { useQuery } from '@tanstack/react-query';
import { leadQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';
import getLeadsByUserId from '../../services/lead/getLeadsByUserId';

export const useGetLeads = (userExternalId: string) => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: leadQueriesKeys.getLeads(),
        queryFn: async () => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await getLeadsByUserId(userExternalId, token);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
    });
};
