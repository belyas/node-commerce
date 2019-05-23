const PASSWORD_MIN_CHARS = 6;
const isEmail = email => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

const validateLoginAuth = values => {
    const errors = {};

    // Email Errors
    if (!values.email) {
        errors.email = 'Required Email';
    } else if (!isEmail(values.email)) {
        errors.email = 'Invalid email address';
    }

    // Password Errors
    if (!values.password) {
        errors.password = 'Required Password';
    } else if (values.password.length < PASSWORD_MIN_CHARS) {
        errors.password = `Password must be at least ${PASSWORD_MIN_CHARS} characters`;
    }

    return errors;
};

export { validateLoginAuth };
