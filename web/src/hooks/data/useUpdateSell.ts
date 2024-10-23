import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateSell from '../../services/sell/updateSell';
import { SellType, UpdateSell } from '../../types';

export const useUpdateSell = (sellId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['sell', sellId],
        mutationFn: async (updateSellParams: UpdateSell) => {
            const response = await updateSell(sellId, updateSellParams);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (updatedSell) => {
            queryClient.setQueryData(['sells'], (oldData: SellType[]) => {
                return oldData.map((sell) => {
                    if (sell.id === sellId) {
                        return { ...sell, ...updatedSell };
                    }
                    return sell;
                });
            });
        },
    });
};
