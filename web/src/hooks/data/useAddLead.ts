import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateLead, LeadType } from '../../types';
import { vehicleQueriesKeys } from '../../keys/queries';
import { leadMutationsKeys } from '../../keys/mutations';
import { useAuth } from '@clerk/clerk-react';
import createLead from '../../services/lead/createLead';

export const useAddLead = () => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: leadMutationsKeys.addLead(),
        mutationFn: async (createLeadParams: CreateLead) => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await createLead(createLeadParams, token);

            if (response?.status !== 201) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (newLead) => {
            queryClient.setQueryData(
                vehicleQueriesKeys.getVehicles(),
                (oldData: LeadType[]) => {
                    return [...oldData, newLead];
                }
            );
        },
    });
};
