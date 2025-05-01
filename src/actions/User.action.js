import axios from 'axios';

const API_URL = 'https://ediewitsch-expressjs.vercel.app/api/user'; 

export const registerUser = async (input) => {
    try {
        const response = await axios.post(`${API_URL}/register`, null, {
            params: {
                name: input.name,
                email: input.email,
                password: input.password
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw error;
    }
}

export const loginUser = async (input) => {
    try {
        const response = await axios.post(`${API_URL}/login`, null, {
            params: {
                email: input.email,
                password: input.password
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw error;
    }
}