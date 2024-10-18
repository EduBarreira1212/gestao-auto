import axios from 'axios';

const getCarsByUserId = async (userId: string) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/cars/?userId=${userId}`
        );

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getCarsByUserId;
