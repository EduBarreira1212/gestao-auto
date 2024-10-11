import axios from 'axios';
import { CreateCar } from '../../types';

const createCar = async (createCarParams: CreateCar) => {
    try {
        const response = await axios.post(
            `http://localhost:3000/api/cars`,
            createCarParams
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createCar;
