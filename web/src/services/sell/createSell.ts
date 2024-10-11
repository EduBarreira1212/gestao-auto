import axios from 'axios';
import { CreateSell } from '../../types';

const createSell = async (createSellParams: CreateSell) => {
    try {
        const response = await axios.post(
            `http://localhost:3000/api/sells`,
            createSellParams
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createSell;
