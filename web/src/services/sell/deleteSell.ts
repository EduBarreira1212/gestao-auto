import axios from 'axios';

const deleteSell = async (SellId: string) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/api/sells/${SellId}`
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteSell;
