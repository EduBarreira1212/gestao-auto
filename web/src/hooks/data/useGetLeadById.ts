import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import getLeadById from '../../services/lead/getLeadById';
import { leadQueriesKeys } from '../../keys/queries';

export const useGetLeadById = (leadId: string) => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: leadQueriesKeys.getLeadById(leadId),
        queryFn: async () => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await getLeadById(leadId, token);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
    });
};
