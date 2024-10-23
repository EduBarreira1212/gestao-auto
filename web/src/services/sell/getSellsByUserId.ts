import { api } from '../../lib/axios';

const getSellsByUserId = async (userId: string) => {
    try {
        const response = await api.get(`/sells/?userId=${userId}`);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getSellsByUserId;
