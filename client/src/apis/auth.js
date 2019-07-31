import axios from '../axios';

export const loginAuth = async ({ email, password }) => {
    try {
        const res = await axios.post('/auth', {
            email,
            password,
        });

        return res.data;
    } catch (err) {
        throw err;
    }
};
