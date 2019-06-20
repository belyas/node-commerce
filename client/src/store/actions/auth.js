import axios from '../../axios';
import { setAuthToken } from '../../utils/api';
import * as actionTypes from '../actions/actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId,
    };
};

export const authFailure = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const authLoggedout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const auth = (email, password) => {
    return async dispatch => {
        dispatch(authStart());

        try {
            const res = await axios.post('/auth', {
                email,
                password,
            });
            const data = await res.data;

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                // const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
                dispatch(authSuccess(data.token, data.userId));
            } else {
                dispatch(authFailure(data.error));
            }
        } catch (err) {
            console.log(`Catch error: ${err.message}`);
            dispatch(authFailure('Invalid email or password'));
        }
    };
};

export const authCheckState = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(authLoggedout());
        } else {
            const userId = localStorage.getItem('userId');

            // check server response
            try {
                setAuthToken();
                const res = await axios.post('/auth/checkstatus');
                const data = await res.data;

                console.log('[Response Check]: ', data);

                dispatch(authSuccess(token, userId));
            } catch (err) {
                console.log('[AuthCheckState::ResponseError]: ', err);
                dispatch(authLoggedout());
            }
        }
    };
};
