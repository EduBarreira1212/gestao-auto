import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LeadType, UpdateLead } from '../../types';
import { leadMutationsKeys } from '../../keys/mutations';
import { leadQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';
import updateLead from '../../services/lead/updateLead';

export const useUpdateLead = (leadId: string) => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: leadMutationsKeys.updateLead(leadId),
        mutationFn: async (updateLeadParams: UpdateLead) => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await updateLead(leadId, updateLeadParams, token);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (updatedLead) => {
            queryClient.setQueryData(
                leadQueriesKeys.getLeads(),
                (oldData: LeadType[]) => {
                    return oldData.map((lead) => {
                        if (lead.id === leadId) {
                            return { ...lead, ...updatedLead };
                        }
                        return lead;
                    });
                }
            );
        },
    });
};
