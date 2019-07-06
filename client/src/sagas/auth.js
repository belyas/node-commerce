import { put, call, takeLatest } from 'redux-saga/effects';

import axios from '../axios';
import { AUTH_SIGNUP_REQUEST } from '../store/actions/actionTypes';
import {
    signupAuthFail,
    signupAuthStart,
    signupAuthSuccess,
} from '../store/actions';

function* checkSignupData(action) {
    yield put(signupAuthStart());

    const { email, password, firstname, lastname } = action.payload;

    try {
        const response = yield call(axios.post, 'auth/signup', {
            email,
            password,
            firstname,
            lastname,
        });
        const { error } = response.data;

        if (error) {
            yield put(signupAuthFail(error));
        } else {
            yield put(signupAuthSuccess());
        }
    } catch (err) {
        yield put(signupAuthFail(err.message));
    }
}

export function* signupSaga() {
    yield takeLatest(AUTH_SIGNUP_REQUEST, checkSignupData);
}
