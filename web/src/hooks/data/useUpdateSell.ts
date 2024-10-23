import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateSell from '../../services/sell/updateSell';
import { SellType, UpdateSell } from '../../types';
import { sellMutationsKeys } from '../../keys/mutations';
import { sellQueriesKeys } from '../../keys/queries';

export const useUpdateSell = (sellId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: sellMutationsKeys.updateSell(sellId),
        mutationFn: async (updateSellParams: UpdateSell) => {
            const response = await updateSell(sellId, updateSellParams);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (updatedSell) => {
            queryClient.setQueryData(
                sellQueriesKeys.getSells(),
                (oldData: SellType[]) => {
                    return oldData.map((sell) => {
                        if (sell.id === sellId) {
                            return { ...sell, ...updatedSell };
                        }
                        return sell;
                    });
                }
            );
        },
    });
};
