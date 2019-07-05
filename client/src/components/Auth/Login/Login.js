import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { concatClasses } from '../../../utils/helpers';
import styles from './Login.module.css';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';

let hideForm = { display: 'none' };

const Login = ({
    isAuthenticated,
    isLogin,
    errors,
    email,
    password,
    error,
    blurHandler,
    changeHandler,
    submitHanlder,
    toggleLoginHandler,
}) => {
    let redirectUrl = null;

    if (isAuthenticated) {
        redirectUrl = <Redirect to="/" />;
    }

    const loginFormProps = {
        isLogin,
        errors,
        email,
        password,
        error,
        blurHandler,
        changeHandler,
        submitHanlder,
        hideForm,
    };
    const signupFormProps = { isLogin, hideForm };

    return (
        <div className={concatClasses(styles.wrapper, styles.fadeInDown)}>
            {redirectUrl}
            <div className={concatClasses(styles.autoMg, styles.formContent)}>
                <LoginForm {...loginFormProps} />

                <SignupForm {...signupFormProps} />

                <div className={concatClasses(styles.formFooter)}>
                    <a
                        href="#/"
                        className={concatClasses(
                            styles.underlineHover,
                            styles.switchSignup
                        )}
                        onClick={toggleLoginHandler}
                        style={isLogin ? {} : hideForm}>
                        Don't have an account yet? <b>Signup</b>
                    </a>
                    <a
                        href="#/"
                        className={concatClasses(
                            styles.underlineHover,
                            styles.switchSignin
                        )}
                        onClick={toggleLoginHandler}
                        style={isLogin ? hideForm : {}}>
                        Already registered? <b>Loign</b>
                    </a>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isLogin: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    email: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    blurHandler: PropTypes.func.isRequired,
    changeHandler: PropTypes.func.isRequired,
    submitHanlder: PropTypes.func.isRequired,
    toggleLoginHandler: PropTypes.func.isRequired,
};

export default Login;
