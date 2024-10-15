import axios from 'axios';
import { UpdateUser } from '../../types';

const updateCar = async (userId: string, updateUserParams: UpdateUser) => {
    try {
        const response = await axios.patch(
            `http://localhost:3000/api/users/${userId}`,
            updateUserParams
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateCar;
