import axios from 'axios';

const deleteCar = async (carId: string) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/api/cars/${carId}`
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteCar;
