import axios from '../axios';

const loginAuth = values => {
    axios
        .post('/auth', {
            email: values.email,
            password: values.password,
        })
        .then(res => res.data)
        .then(res => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('userId', res.userId);

                return true;
            }

            console.log('Error: ', res.error);
            return false;
        })
        .catch(err => {
            console.log(`Catch error: ${err}`);
            return false;
        });
};

export default loginAuth;
