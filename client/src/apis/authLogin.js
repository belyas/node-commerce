import axios from '../axios';

const loginAuth = async (values) => {
    try {
        const res = await axios.post('/auth', {
            email: values.email,
            password: values.password,
        });
        const data = await res.data;

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
    
            return true;
        }
    
        console.log('Error: ', data.error);
        return false;
    } catch (err) {
        console.log(`Catch error: ${err}`);
        return false;
    }
};

export default loginAuth;
