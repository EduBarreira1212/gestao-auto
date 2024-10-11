import axios from 'axios';

const updateCar = async (carId: string, updateCarParams: any) => {
    try {
        const response = await axios.patch(
            `http://localhost:3000/api/cars/${carId}`,
            updateCarParams
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateCar;
