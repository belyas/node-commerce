import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    signupSuccess: false,
};

const authStart = state => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        token: action.token,
        userId: action.userId,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
    });
};

const authLoggedout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
    });
};

const signupStartAuth = state => {
    return updateObject(state, { loading: true });
};

const signupFailAuth = (state, action) => {
    return updateObject(state, { error: action.payload.error, loading: false });
};

const signupSuccessAuth = state => {
    return updateObject(state, {
        loading: false,
        error: null,
        signupSuccess: true,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLoggedout(state, action);
        case actionTypes.AUTH_SIGNUP_START:
            return signupStartAuth(state);
        case actionTypes.AUTH_SIGNUP_FAIL:
            return signupFailAuth(state, action);
        case actionTypes.AUTH_SIGNUP_SUCCESS:
            return signupSuccessAuth(state);
        default:
            return state;
    }
};

export default reducer;
