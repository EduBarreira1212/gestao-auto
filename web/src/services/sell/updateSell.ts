import { api } from '../../lib/axios';
import { UpdateSell } from '../../types';

const updateSell = async (
    sellId: string,
    updateSellParams: UpdateSell,
    token: string
) => {
    try {
        const response = await api.patch(`/sells/${sellId}`, updateSellParams, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateSell;
