import axios from 'axios';

const updateSell = async (sellId: string, updateSellParams: any) => {
    try {
        const response = await axios.patch(
            `http://localhost:3000/api/sells/${sellId}`,
            updateSellParams
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateSell;
