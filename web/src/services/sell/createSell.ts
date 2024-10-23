import { api } from '../../lib/axios';
import { CreateSell } from '../../types';

const createSell = async (createSellParams: CreateSell) => {
    try {
        const response = await api.post(`/sells`, createSellParams);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createSell;
