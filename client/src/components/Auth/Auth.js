import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { concatClasses } from '../../utils/helpers';
import styles from './Auth.module.css';
import LoginForm from './LoginForm/LoginForm';
import SignupForm from './SignupForm/SignupForm';

let hideForm = { display: 'none' };

const Auth = ({
    isAuthenticated,
    isLogin,
    errors,
    email,
    password,
    firstname,
    lastname,
    error,
    blurHandler,
    changeHandler,
    loginSubmitHanlder,
    toggleLoginHandler,
    signupSubmitHanlder,
    loading,
    signupSuccess,
}) => {
    let redirectUrl = null;

    if (isAuthenticated) {
        redirectUrl = <Redirect to="/" />;
    }

    if (signupSuccess) {
        isLogin = true;
    }

    const loginFormProps = {
        isLogin,
        errors,
        email,
        password,
        error,
        blurHandler,
        changeHandler,
        loginSubmitHanlder,
        hideForm,
    };
    const signupFormProps = {
        isLogin,
        hideForm,
        errors,
        email,
        password,
        firstname,
        lastname,
        error,
        changeHandler,
        blurHandler,
        signupSubmitHanlder,
        loading,
    };

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

Auth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isLogin: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    email: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    blurHandler: PropTypes.func.isRequired,
    changeHandler: PropTypes.func.isRequired,
    loginSubmitHanlder: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    signupSuccess: PropTypes.bool,
};

export default Auth;
