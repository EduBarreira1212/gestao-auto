import { api } from '../../lib/axios';
import { UpdateVehicle } from '../../types';

const updateCar = async (carId: string, updateCarParams: UpdateVehicle) => {
    try {
        const response = await api.patch(`/cars/${carId}`, updateCarParams);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateCar;
