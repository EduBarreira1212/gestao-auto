import { api } from '../../lib/axios';
import { CreateSell } from '../../types';

const createSell = async (createSellParams: CreateSell, token: string) => {
    try {
        const response = await api.post(`/sells`, createSellParams, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createSell;
