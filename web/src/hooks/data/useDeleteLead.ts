import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LeadType } from '../../types';
import { leadMutationsKeys } from '../../keys/mutations';
import { leadQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';
import deleteLead from '../../services/lead/deleteLead';

export const useDeleteLead = (leadId: string) => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: leadMutationsKeys.deleteLead(leadId),
        mutationFn: async () => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await deleteLead(leadId, token);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (deletedLead: LeadType) => {
            queryClient.setQueryData(
                leadQueriesKeys.getLeads(),
                (oldData: LeadType[]) => {
                    return oldData.filter((lead) => {
                        return lead.id !== deletedLead.id;
                    });
                }
            );
        },
    });
};
