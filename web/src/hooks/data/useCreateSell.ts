import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSell, SellType } from '../../types';
import createSell from '../../services/sell/createSell';
import { sellMutationsKeys } from '../../keys/mutations';
import { sellQueriesKeys } from '../../keys/queries';

export const useCreateSell = (carId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: sellMutationsKeys.addSell(carId),
        mutationFn: async (createSellParams: CreateSell) => {
            const response = await createSell(createSellParams);

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
