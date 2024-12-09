import { api } from '../../lib/axios';

const getLeadById = async (leadId: string, token: string) => {
    try {
        const response = await api.get(`/leads/${leadId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getLeadById;
