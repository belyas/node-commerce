import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { concatClasses } from '../../../utils/helpers';
import styles from './Login.module.css';

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

    return (
        <div className={concatClasses(styles.wrapper, styles.fadeInDown)}>
            {redirectUrl}
            <div className={concatClasses(styles.autoMg, styles.formContent)}>
                <form onSubmit={submitHanlder} style={isLogin ? {} : hideForm}>
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
                    {errors && errors.email && (
                        <p className="alert alert-danger">{errors.email}</p>
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
                    {errors && errors.password && (
                        <p className="alert alert-danger">{errors.password}</p>
                    )}
                    <input
                        type="submit"
                        className={concatClasses(styles.fadeIn, styles.fourth)}
                        value="Log In"
                    />
                    {error && <p className="alert alert-danger">{error}</p>}
                </form>

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
    errors: PropTypes.array,
    email: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    blurHandler: PropTypes.func.isRequired,
    changeHandler: PropTypes.func.isRequired,
    submitHanlder: PropTypes.func.isRequired,
    toggleLoginHandler: PropTypes.func.isRequired,
};

export default Login;
