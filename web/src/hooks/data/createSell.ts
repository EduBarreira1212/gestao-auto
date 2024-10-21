import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSell, SellType } from '../../types';
import createSell from '../../services/sell/createSell';

export const useCreateSell = (carId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createSell', carId],
        mutationFn: async (createSellParams: CreateSell) => {
            const response = await createSell(createSellParams);

            if (response?.status !== 201) {
                throw new Error();
            }

            return response?.data;
        },
        onSuccess: (newSell) => {
            queryClient.setQueryData(['sells'], (oldData: SellType[]) => {
                return [...oldData, newSell];
            });
        },
    });
};
