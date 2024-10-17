import axios from 'axios';
import { CreateVehicle } from '../../types';

const createCar = async (createCarParams: CreateVehicle) => {
    try {
        const response = await axios.post(
            `http://localhost:3000/api/cars`,
            createCarParams
        );

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createCar;
