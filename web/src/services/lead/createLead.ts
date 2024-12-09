import { api } from '../../lib/axios';
import { CreateLead } from '../../types';

const createLead = async (createLeadParams: CreateLead, token: string) => {
    try {
        const response = await api.post('/leads', createLeadParams, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createLead;
