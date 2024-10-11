import axios from 'axios';

const createSell = async (createSellParams: any) => {
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
