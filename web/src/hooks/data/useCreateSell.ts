import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSell, SellType } from '../../types';
import createSell from '../../services/sell/createSell';
import { sellMutationsKeys } from '../../keys/mutations';
import { sellQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';

export const useCreateSell = (carId: string) => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: sellMutationsKeys.addSell(carId),
        mutationFn: async (createSellParams: CreateSell) => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await createSell(createSellParams, token);

            if (response?.status !== 201) {
                throw new Error();
            }

            return response?.data;
        },
        onSuccess: (newSell) => {
            queryClient.setQueryData(
                sellQueriesKeys.getSells(),
                (oldData: SellType[]) => {
                    return [...oldData, newSell];
                }
            );
        },
    });
};
