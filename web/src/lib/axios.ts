import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://auto-manager-api.onrender.com/api',
});
