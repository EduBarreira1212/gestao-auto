import { api } from '../../lib/axios';
import { UpdateUser } from '../../types';

const updateCar = async (userId: string, updateUserParams: UpdateUser) => {
    try {
        const response = await api.patch(`/users/${userId}`, updateUserParams);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateCar;
