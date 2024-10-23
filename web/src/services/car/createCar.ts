import { CreateVehicle } from '../../types';
import { api } from '../../lib/axios';

const createCar = async (createCarParams: CreateVehicle) => {
    try {
        const response = await api.post(`/cars`, createCarParams);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createCar;
