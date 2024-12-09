import { api } from '../../lib/axios';
import { UpdateLead } from '../../types';

const updateLead = async (
    leadId: string,
    updateLeadParams: UpdateLead,
    token: string
) => {
    try {
        const response = await api.patch(`/leads/${leadId}`, updateLeadParams, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default updateLead;
