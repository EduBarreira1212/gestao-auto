import { api } from '../../lib/axios';

const createCar = async (createCarParams: FormData, token: string) => {
    try {
        const response = await api.post(`/cars`, createCarParams, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createCar;
