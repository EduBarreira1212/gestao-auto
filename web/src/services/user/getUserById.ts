import { api } from '../../lib/axios';

const getUserById = async (userId: string) => {
    try {
        const response = await api.get(`/users/${userId}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getUserById;
