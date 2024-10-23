import { api } from '../../lib/axios';

const getCarsByUserId = async (userId: string) => {
    try {
        const response = await api.get(`/cars/?userId=${userId}`);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getCarsByUserId;
