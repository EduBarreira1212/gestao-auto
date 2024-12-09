import { api } from '../../lib/axios';

const deleteLead = async (leadId: string, token: string) => {
    try {
        const response = await api.delete(`/leads/${leadId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default deleteLead;
