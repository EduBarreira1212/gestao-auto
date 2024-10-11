import axios from 'axios';

const getSellsByUserId = async (userId: string) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/sells/?userId=${userId}`
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getSellsByUserId;
