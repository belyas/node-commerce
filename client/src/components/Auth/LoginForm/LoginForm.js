import React from 'react';
import PropTypes from 'prop-types';

import { concatClasses } from '../../../utils/helpers';
import styles from '../Auth.module.css';

const LoginForm = ({
    isLogin,
    errors,
    email,
    password,
    error,
    blurHandler,
    changeHandler,
    loginSubmitHanlder,
    hideForm,
}) => {
    return (
        <form onSubmit={loginSubmitHanlder} style={isLogin ? {} : hideForm}>
            <h2
                className={concatClasses(
                    styles.fadeIn,
                    styles.first,
                    styles.formTitle
                )}>
                Login
            </h2>
            <input
                type="text"
                className={concatClasses(styles.fadeIn, styles.second)}
                name="email"
                placeholder="Email address"
                value={email}
                onChange={changeHandler}
                onBlur={blurHandler}
                required
            />
            {errors.email && (
                <p className="alert email-error alert-danger">{errors.email}</p>
            )}
            <input
                type="password"
                className={concatClasses(styles.fadeIn, styles.third)}
                name="password"
                placeholder="Password"
                value={password}
                onChange={changeHandler}
                onBlur={blurHandler}
                required
            />
            {errors.password && (
                <p className="alert password-error alert-danger">
                    {errors.password}
                </p>
            )}
            <input
                type="submit"
                className={concatClasses(styles.fadeIn, styles.fourth)}
                value="Log In"
            />
            {error && <p className="alert alert-danger">{error}</p>}
        </form>
    );
};

LoginForm.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    blurHandler: PropTypes.func.isRequired,
    changeHandler: PropTypes.func.isRequired,
    loginSubmitHanlder: PropTypes.func.isRequired,
};

export default LoginForm;
