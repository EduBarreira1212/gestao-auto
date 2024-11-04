import { api } from '../../lib/axios';

const deleteSell = async (SellId: string, token: string) => {
    try {
        const response = await api.delete(`/sells/${SellId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteSell;
