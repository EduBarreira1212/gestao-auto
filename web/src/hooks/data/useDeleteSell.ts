import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteSell from '../../services/sell/deleteSell';
import { SellType } from '../../types';
import { sellMutationsKeys } from '../../keys/mutations';
import { sellQueriesKeys } from '../../keys/queries';
import { useAuth } from '@clerk/clerk-react';

export const useDeleteSell = (sellId: string) => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: sellMutationsKeys.deleteSell(sellId),
        mutationFn: async () => {
            const token = await getToken();

            if (!token) {
                return null;
            }

            const response = await deleteSell(sellId, token);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (deletedSell: SellType) => {
            queryClient.setQueryData(
                sellQueriesKeys.getSells(),
                (oldData: SellType[]) => {
                    return oldData.filter((sell) => {
                        return sell.id !== deletedSell.id;
                    });
                }
            );
        },
    });
};
