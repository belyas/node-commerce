import axios from '../axios';

const loginAuth = values => {
    axios
        .post('/auth', {
            email: values.email,
            password: values.password,
        })
        .then(res => res.data)
        .then(res => {
            if (res.error) {
                console.log('Error: ', res.error);
            }

            if (res.token) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('userId', res.userId);
            }
        })
        .catch(console.log);
};

export default loginAuth;
