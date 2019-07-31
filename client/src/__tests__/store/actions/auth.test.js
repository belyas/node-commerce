import * as api from '../../../apis/auth';
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
    let mockedDispatch;
    let response;
    let email;
    let password;

    beforeEach(async () => {
        mockedDispatch = jest.fn();
        response = {
            token: 'token',
            userId: 123,
        };
        api.loginAuth = jest.fn().mockResolvedValue(response);
        email = 'some@example.org';
        password = '22344';

        const action = auth(email, password);
        await action(mockedDispatch);
    });
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

    describe('Auth login', () => {
        it('should call loginauth', () => {
            expect(api.loginAuth).toHaveBeenCalled();
        });

        it('should call loginauth with params', () => {
            expect(api.loginAuth).toBeCalledWith({ email, password });
        });

        it('should return mocked dispatch with correct data', () => {
            expect(mockedDispatch).toHaveBeenCalledTimes(2);
            expect(mockedDispatch).toHaveBeenLastCalledWith({
                type: AUTH_SUCCESS,
                token: response.token,
                userId: response.userId,
            });
        });

        it('should return auth failure', async () => {
            const mockedErrDispatch = jest.fn();
            api.loginAuth = jest
                .fn()
                .mockRejectedValue(new Error('Async error'));
            const action = auth(email, password);
            await action(mockedErrDispatch);

            expect(mockedErrDispatch).toBeCalledWith(
                authFailure('Invalid email or password')
            );
        });
    });
});
