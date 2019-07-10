const {
    hasUserSession,
    isAuthenticatedApi,
} = require('../../middlewares/is-auth');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Auth middleware WEB', () => {
    it('should pass session middleware', () => {
        const req = {
            session: {
                user: 'yassine',
            },
        };
        const hasSessionToPass = hasUserSession(req, {}, () => 'Passed!');

        expect(hasSessionToPass).toEqual('Passed!');
    });

    it('should not pass session middleware', () => {
        const req = {
            session: {
                user: null,
            },
        };
        const res = {
            redirect: uri => uri,
        };
        const hasSessionToPass = hasUserSession(req, res, () => 'Passed!');

        expect(hasSessionToPass).toEqual('/auth/login');
    });
});

describe('Auth middleware API', () => {
    let res;
    beforeEach(() => {
        res = {
            code_status: 200,
            status: code => {
                res.code_status = code;
                return res;
            },
            json: obj => obj,
        };
    });

    it('should return not authenticated', () => {
        const req = {
            get: () => null,
        };
        const isAuth = isAuthenticatedApi(req, res, () => {});

        expect(isAuth.error).toEqual('Not authenticated.');
    });

    it('should return invalid decoded token', () => {
        const req = {
            get: () => 'Bearer sometokenstring',
        };
        const isAuth = isAuthenticatedApi(req, res, () => {});

        expect(isAuth.error).toBeTruthy();
    });

    it('should return valid token and passes', () => {
        const fakeToken = { userId: 123 };
        const verifiedToken = jwt.verify.mockReturnValue(fakeToken);
        const req = {
            get: () => 'Bearer sometokenstring',
        };
        const isAuth = isAuthenticatedApi(req, res, () => 'Passed!');
        const verifyToken = verifiedToken();

        expect(isAuth).toEqual('Passed!');
        expect(verifyToken).toHaveProperty('userId', 123);
        expect(verifyToken).toEqual(fakeToken);
    });
});
