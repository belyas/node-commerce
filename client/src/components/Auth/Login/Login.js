import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { concatClasses } from '../../../utils/helpers';
import styles from './Login.module.css';
import LoginForm from '../LoginForm/LoginForm';

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
        errors,
        email,
        password,
        error,
        blurHandler,
        changeHandler,
        submitHanlder,
    };

    return (
        <div className={concatClasses(styles.wrapper, styles.fadeInDown)}>
            {redirectUrl}
            <div className={concatClasses(styles.autoMg, styles.formContent)}>
                <LoginForm {...loginFormProps} />

                <form action="#" method="POST" style={isLogin ? hideForm : {}}>
                    <h2
                        className={concatClasses(
                            styles.fadeIn,
                            styles.first,
                            styles.formTitle
                        )}>
                        Signup
                    </h2>
                    <input
                        type="text"
                        className={concatClasses(styles.fadeIn, styles.second)}
                        name="firstname"
                        placeholder="First name"
                        required
                    />
                    <input
                        type="text"
                        className={concatClasses(styles.fadeIn, styles.second)}
                        name="lastname"
                        placeholder="Last name"
                        required
                    />
                    <input
                        type="text"
                        className={concatClasses(styles.fadeIn, styles.third)}
                        name="email"
                        placeholder="Email address"
                        required
                    />
                    <input
                        type="password"
                        className={concatClasses(styles.fadeIn, styles.third)}
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <input
                        type="button"
                        className={concatClasses(styles.fadeIn, styles.fourth)}
                        value="Register"
                    />
                </form>

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
