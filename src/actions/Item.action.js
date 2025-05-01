import axios from 'axios';

const API_URL = 'https://ediewitsch-expressjs.vercel.app/api/item';

export const getItem = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}