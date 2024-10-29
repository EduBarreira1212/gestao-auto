import { api } from '../../lib/axios';

const deleteCar = async (carId: string) => {
    try {
        const response = await api.delete(`/cars/${carId}`);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteCar;
