import axios from 'axios';

const getSellById = async (sellId: string) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/sells/${sellId}`
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getSellById;
