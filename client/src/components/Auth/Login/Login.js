import React from 'react';
import { Redirect } from 'react-router-dom';

import { concatClasses } from '../../../utils/helpers';
import styles from './Login.module.css';

let hideForm = { display: 'none' };

const Login = props => {
    let redirectUrl = null;

    if (props.isAuthenticated) {
        redirectUrl = <Redirect to="/" />;
    }

    return (
        <div className={concatClasses(styles.wrapper, styles.fadeInDown)}>
            {redirectUrl}
            <div className={concatClasses(styles.autoMg, styles.formContent)}>
                <form
                    onSubmit={props.submitHanlder}
                    style={props.isLogin ? {} : hideForm}>
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
                        value={props.email}
                        onChange={props.changeHandler}
                        onBlur={props.blurHandler}
                        required
                    />
                    {props.errors && props.errors.email && (
                        <p className="alert alert-danger">
                            {props.errors.email}
                        </p>
                    )}
                    <input
                        type="password"
                        className={concatClasses(styles.fadeIn, styles.third)}
                        name="password"
                        placeholder="Password"
                        value={props.password}
                        onChange={props.changeHandler}
                        onBlur={props.blurHandler}
                        required
                    />
                    {props.errors && props.errors.password && (
                        <p className="alert alert-danger">
                            {props.errors.password}
                        </p>
                    )}
                    <input
                        type="submit"
                        className={concatClasses(styles.fadeIn, styles.fourth)}
                        value="Log In"
                    />
                    {props.error && (
                        <p className="alert alert-danger">{props.error}</p>
                    )}
                </form>

                <form
                    action="#"
                    method="POST"
                    style={props.isLogin ? hideForm : {}}>
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
                        onClick={props.toggleLoginHandler}
                        style={props.isLogin ? {} : hideForm}>
                        Don't have an account yet? <b>Signup</b>
                    </a>
                    <a
                        href="#/"
                        className={concatClasses(
                            styles.underlineHover,
                            styles.switchSignin
                        )}
                        onClick={props.toggleLoginHandler}
                        style={props.isLogin ? hideForm : {}}>
                        Already registered? <b>Loign</b>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
