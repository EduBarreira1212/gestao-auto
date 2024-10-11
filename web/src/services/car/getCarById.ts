import axios from 'axios';

const getCarById = async (carId: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/cars/${carId}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getCarById;
