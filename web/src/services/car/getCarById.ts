import { api } from '../../lib/axios';

const getCarById = async (carId: string, token: string) => {
    try {
        const response = await api.get(`/cars/${carId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getCarById;
