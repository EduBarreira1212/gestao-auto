import axios from 'axios';
import { UpdateSell } from '../../types';

const updateSell = async (sellId: string, updateSellParams: UpdateSell) => {
    try {
        const response = await axios.patch(
            `http://localhost:3000/api/sells/${sellId}`,
            updateSellParams
        );

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateSell;
