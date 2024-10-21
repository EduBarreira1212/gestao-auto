import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateVehicle, VehicleType } from '../../types';
import createCar from '../../services/car/createCar';

export const useAddVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['addVehicle'],
        mutationFn: async (vehicleData: CreateVehicle) => {
            const response = await createCar(vehicleData);

            if (response?.status !== 201) {
                throw new Error();
            }

            const newVehicle = response.data;

            return newVehicle;
        },
        onSuccess: (newVehicle) => {
            queryClient.setQueryData(['vehicles'], (oldData: VehicleType[]) => {
                return [...oldData, newVehicle];
            });
        },
    });
};
