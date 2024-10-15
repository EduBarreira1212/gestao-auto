import axios from 'axios';
import { CreateUser } from '../../types';

const createUser = async (createUserParams: CreateUser) => {
    try {
        const response = await axios.post(
            `http://localhost:3000/api/users`,
            createUserParams
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default createUser;
