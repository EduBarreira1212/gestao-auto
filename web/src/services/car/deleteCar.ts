import { api } from '../../lib/axios';

const deleteCar = async (carId: string, token: string) => {
    try {
        const response = await api.delete(`/cars/${carId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteCar;
