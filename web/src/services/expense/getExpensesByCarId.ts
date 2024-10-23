import { api } from '../../lib/axios';

const getExpensesByCarId = async (carId: string) => {
    try {
        const response = await api.get(`/sells/?carId=${carId}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getExpensesByCarId;
