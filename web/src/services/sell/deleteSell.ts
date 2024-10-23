import { api } from '../../lib/axios';

const deleteSell = async (SellId: string) => {
    try {
        const response = await api.delete(`/sells/${SellId}`);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteSell;
