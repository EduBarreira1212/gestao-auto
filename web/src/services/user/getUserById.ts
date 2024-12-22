import { api } from '../../lib/axios';

const getUserById = async (userId: string, token: string) => {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getUserById;
