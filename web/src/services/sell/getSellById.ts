import { api } from '../../lib/axios';

const getSellById = async (sellId: string) => {
    try {
        const response = await api.get(`/sells/${sellId}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getSellById;
