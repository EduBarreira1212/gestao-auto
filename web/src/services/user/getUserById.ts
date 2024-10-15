import axios from 'axios';

const getUserById = async (userId: string) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/users/${userId}`
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getUserById;
