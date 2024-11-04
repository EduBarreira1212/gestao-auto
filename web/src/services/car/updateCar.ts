import { api } from '../../lib/axios';
import { UpdateVehicle } from '../../types';

const updateCar = async (
    carId: string,
    updateCarParams: UpdateVehicle,
    token: string
) => {
    try {
        const response = await api.patch(`/cars/${carId}`, updateCarParams, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateCar;
