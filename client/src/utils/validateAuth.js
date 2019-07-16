const PASSWORD_MIN_CHARS = 6;
const NAMES_MIN_CHARS = 3;
const isEmail = email => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

const validateAuth = (values, type = 'login') => {
    const errors = {};

    // Email Errors
    if (!values.email) {
        errors.email = 'Email required';
    } else if (!isEmail(values.email)) {
        errors.email = 'Invalid email address';
    }

    // Password Errors
    if (!values.password) {
        errors.password = 'Password required';
    } else if (values.password.length < PASSWORD_MIN_CHARS) {
        errors.password = `Password must be at least ${PASSWORD_MIN_CHARS} characters`;
    }

    if (type === 'signup') {
        // First name Errors
        if (!values.firstname) {
            errors.firstname = 'First name required';
        } else if (values.firstname.length < NAMES_MIN_CHARS) {
            errors.firstname = `First name must be at least ${NAMES_MIN_CHARS} characters`;
        }

        // Password Errors
        if (!values.lastname) {
            errors.lastname = 'Last name required';
        } else if (values.lastname.length < NAMES_MIN_CHARS) {
            errors.lastname = `Last name must be at least ${NAMES_MIN_CHARS} characters`;
        }
    }

    return errors;
};

const validateLoginAuth = values => {
    return validateAuth(values);
};

const validateSignupAuth = values => {
    return validateAuth(values, 'signup');
};

export { validateLoginAuth, isEmail, PASSWORD_MIN_CHARS, validateSignupAuth };
