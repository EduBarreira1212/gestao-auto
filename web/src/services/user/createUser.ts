import { api } from '../../lib/axios';
import { CreateUser } from '../../types';

const createUser = async (createUserParams: CreateUser) => {
    try {
        const response = await api.post(`/users`, createUserParams);

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createUser;
