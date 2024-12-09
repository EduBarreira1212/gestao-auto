import { api } from '../../lib/axios';

const getLeadsByUserId = async (userId: string, token: string) => {
    try {
        const response = await api.get(`/leads/?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getLeadsByUserId;
