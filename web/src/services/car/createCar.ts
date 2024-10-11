import axios from 'axios';

const createCar = async (createCarParams: any) => {
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
