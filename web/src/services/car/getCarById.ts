import { api } from '../../lib/axios';

const getCarById = async (carId: string) => {
    try {
        const response = await api.get(`/cars/${carId}`);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getCarById;
