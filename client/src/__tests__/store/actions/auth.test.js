import {
    authStart,
    authSuccess,
    authCheckState,
    authFailure,
    authLoggedout,
    auth,
    signupAuthFail,
    signupAuthRequest,
    signupAuthStart,
    signupAuthSuccess,
} from '../../../store/actions';
import {
    AUTH_FAIL,
    AUTH_LOGOUT,
    AUTH_SIGNUP_FAIL,
    AUTH_SIGNUP_REQUEST,
    AUTH_SIGNUP_START,
    AUTH_SIGNUP_SUCCESS,
    AUTH_START,
    AUTH_SUCCESS,
} from '../../../store/actions/actionTypes';

describe('Auth action creators', () => {
    it('should start auth', () => {
        expect(authStart()).toEqual({ type: AUTH_START });
    });

    it('should have a success auth', () => {
        const token = 'kjwek2j3k23jk23';
        const userId = 123;

        expect(authSuccess(token, userId)).toEqual({
            type: AUTH_SUCCESS,
            token,
            userId,
        });
    });

    it('should have a failure auth', () => {
        const error = 'an error occured!';

        expect(authFailure(error)).toEqual({
            type: AUTH_FAIL,
            error,
        });
    });

    it('should have a logged out state', () => {
        expect(authLoggedout()).toEqual({
            type: AUTH_LOGOUT,
        });
    });

    it('should request a signup auth', () => {
        const firstname = 'yassine';
        const lastname = 'belkaid';
        const email = 'yassine.belkaid87@gmail.com';
        const password = 'pwsrd';
        const { type, payload } = signupAuthRequest(
            firstname,
            lastname,
            email,
            password
        );

        expect(type).toEqual(AUTH_SIGNUP_REQUEST);
        expect(payload).toEqual({ firstname, lastname, email, password });
    });

    it('should start the sign up auth', () => {
        expect(signupAuthStart()).toEqual({ type: AUTH_SIGNUP_START });
    });

    it('should have a failure sign up', () => {
        const error = 'an error occured!';
        const { type, payload } = signupAuthFail(error);

        expect(type).toBe(AUTH_SIGNUP_FAIL);
        expect(payload.error).toBe(error);
    });

    it('should have a success signup auth', () => {
        expect(signupAuthSuccess()).toEqual({ type: AUTH_SIGNUP_SUCCESS });
    });
});
