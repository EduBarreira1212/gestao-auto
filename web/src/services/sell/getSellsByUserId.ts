import { api } from '../../lib/axios';

const getSellsByUserId = async (userId: string, token: string) => {
    try {
        const response = await api.get(`/sells/?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getSellsByUserId;
