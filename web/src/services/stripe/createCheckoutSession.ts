import { api } from '../../lib/axios';

const createCheckoutSession = async (priceId: string) => {
    try {
        const response = await api.post('/stripe/create-checkout-session', priceId);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createCheckoutSession;
