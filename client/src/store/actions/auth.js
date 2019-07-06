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
                setAuthToken(axios);
                await axios.post('/auth/checkstatus');

                dispatch(authSuccess(token, userId));
            } catch (err) {
                dispatch(authLoggedout());
            }
        }
    };
};

export const signupAuthRequest = (firstname, lastname, email, password) => ({
    type: actionTypes.AUTH_SIGNUP_REQUEST,
    payload: { firstname, lastname, email, password },
});

export const signupAuthStart = () => ({
    type: actionTypes.AUTH_SIGNUP_START,
});

export const signupAuthFail = error => ({
    type: actionTypes.AUTH_SIGNUP_FAIL,
    payload: { error },
});

export const signupAuthSuccess = () => ({
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
});
