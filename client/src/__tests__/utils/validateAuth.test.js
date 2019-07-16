import {
    validateLoginAuth,
    PASSWORD_MIN_CHARS,
    isEmail,
} from '../../utils/validateAuth';

const email = 'yassine.belkaid87@gmail.com';

describe('Login authentication valid util', () => {
    it('should return no errors', () => {
        const values = {
            email,
            password: '123456',
        };

        expect(validateLoginAuth(values)).toEqual({});
    });

    it('should validate email', () => {
        expect(isEmail(email)).toBeTruthy();
        expect(isEmail(email.split('@')[1])).toBeFalsy();
    });

    it('should return errors for empty values', () => {
        const values = {};
        const {
            email: emailError,
            password: passwordError,
        } = validateLoginAuth(values);

        expect(emailError).toEqual('Email required');
        expect(passwordError).toEqual('Password required');
    });

    it('should return errors for invalid values', () => {
        const values = {
            email: 'someemail@gmail',
            password: '123',
        };
        const {
            email: emailError,
            password: passwordError,
        } = validateLoginAuth(values);

        expect(emailError).toEqual('Invalid email address');
        expect(passwordError).toEqual(
            `Password must be at least ${PASSWORD_MIN_CHARS} characters`
        );
    });
});
