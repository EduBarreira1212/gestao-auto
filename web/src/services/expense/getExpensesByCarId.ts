import axios from 'axios';

const getExpensesByCarId = async (carId: string) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/sells/?carId=${carId}`
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getExpensesByCarId;
